from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Avg, Q, QuerySet
from django.shortcuts import get_object_or_404

from .models import (
    Product, Category, Address, Cart, CartItem, 
    Order, OrderItem, Review
)
from .serializers import (
    ProductSerializer, CategorySerializer, AddressSerializer,
    CartSerializer, CartItemSerializer, OrderSerializer, 
    OrderItemSerializer, ReviewSerializer
)


class CategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Category CRUD operations.
    - List all categories
    - Create new category (authenticated users)
    - Retrieve single category
    - Update category (authenticated users)
    - Delete category (authenticated users)
    """
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']


class ProductViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Product CRUD operations with advanced filtering.
    - List products with pagination, search, filtering, and sorting
    - Create new product (authenticated users)
    - Retrieve single product with reviews
    - Update product (authenticated users)
    - Delete product (authenticated users)
    """
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'brand', 'is_active', 'price']
    search_fields = ['name', 'description', 'brand']
    ordering_fields = ['price', 'created_at', 'rating', 'stock']
    ordering = ['-created_at']
    throttle_classes = [UserRateThrottle, AnonRateThrottle]

    def get_queryset(self):
        queryset = super().get_queryset()
        params = self.request.query_params
        
        # Support category by name (frontend sends blank for All)
        category = params.get('category')
        if category:
            if category.isdigit():
                queryset = queryset.filter(category__id=category)
            else:
                queryset = queryset.filter(category__name__iexact=category)
        
        # Support search via 'q'
        q = params.get('q')
        if q:
            queryset = queryset.filter(Q(name__icontains=q) | Q(description__icontains=q))
        
        # Support sort=price or -price
        sort = params.get('sort')
        if sort in ['price', '-price', 'rating', '-rating']:
            queryset = queryset.order_by(sort)
        
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        # Simple pagination compatible with frontend 'page' and 'limit'
        try:
            page = int(request.query_params.get('page', '1'))
        except ValueError:
            page = 1
        try:
            limit = int(request.query_params.get('limit', '12'))
        except ValueError:
            limit = 12
        start = (page - 1) * limit
        end = start + limit
        total = queryset.count()
        serializer = self.get_serializer(queryset[start:end], many=True)
        return Response({'items': serializer.data, 'total': total})

    @action(detail=True, methods=['get'])
    def reviews(self, request, pk=None):
        """Get all reviews for a specific product"""
        product = self.get_object()
        reviews = product.reviews.all().order_by('-created_at')
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)


class AddressViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Address CRUD operations.
    - List user's addresses
    - Create new address
    - Retrieve single address
    - Update address
    - Delete address
    - Set default address
    """
    serializer_class = AddressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self) -> QuerySet[Address]:
        # Users can only see their own addresses
        return Address.objects.filter(user=self.request.user).order_by('-is_default', '-created_at')

    def perform_create(self, serializer):
        # Automatically set the user when creating an address
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def set_default(self, request, pk=None):
        """Set an address as the default"""
        address = self.get_object()
        # Remove default from all other addresses
        Address.objects.filter(user=request.user, is_default=True).update(is_default=False)
        # Set this address as default
        address.is_default = True
        address.save()
        return Response({'status': 'default address set'})


class CartViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Cart operations.
    - Retrieve user's cart
    - Clear cart
    """
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'delete']

    def get_queryset(self) -> QuerySet[Cart]:
        # Users can only see their own cart
        return Cart.objects.filter(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        # Get or create cart for the user
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['delete'])
    def clear(self, request):
        """Clear all items from the cart"""
        cart, created = Cart.objects.get_or_create(user=request.user)
        cart.items.all().delete()
        return Response({'status': 'cart cleared'}, status=status.HTTP_204_NO_CONTENT)


class CartItemViewSet(viewsets.ModelViewSet):
    """
    ViewSet for CartItem CRUD operations.
    - List items in user's cart
    - Add item to cart
    - Update item quantity
    - Remove item from cart
    """
    serializer_class = CartItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self) -> QuerySet[CartItem]:
        # Get or create cart for the user
        cart, created = Cart.objects.get_or_create(user=self.request.user)
        return CartItem.objects.filter(cart=cart).order_by('-added_at')

    def create(self, request, *args, **kwargs):
        # Get or create cart for the user
        cart, created = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        # Check if item already exists in cart
        cart_item = CartItem.objects.filter(cart=cart, product_id=product_id).first()
        
        if cart_item:
            # Update quantity if item exists
            cart_item.quantity += quantity
            cart_item.save()
            serializer = self.get_serializer(cart_item)
            return Response(serializer.data)
        else:
            # Create new cart item
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(cart=cart)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        """Update cart item quantity"""
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class OrderViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Order CRUD operations.
    - List user's orders
    - Create order from cart
    - Retrieve single order with items
    - Update order status
    - Cancel order
    """
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_queryset(self) -> QuerySet[Order]:
        # Users can only see their own orders
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    def create(self, request, *args, **kwargs):
        """Create order from user's cart"""
        cart = Cart.objects.filter(user=request.user).first()
        
        if not cart or not cart.items.exists():
            return Response(
                {'error': 'Cart is empty'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Calculate total
        total = sum(item.product.price * item.quantity for item in cart.items.all())

        # Get address if provided
        address_id = request.data.get('address_id')
        address = None
        if address_id:
            address = Address.objects.filter(id=address_id, user=request.user).first()

        # Create order
        order = Order.objects.create(
            user=request.user,
            address=address,
            total=total,
            status='pending'
        )

        # Create order items from cart items
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.product.price
            )
            # Reduce stock
            cart_item.product.stock -= cart_item.quantity
            cart_item.product.save()

        # Clear cart
        cart.items.all().delete()

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        """Update order status"""
        order = self.get_object()
        new_status = request.data.get('status')
        
        if not new_status:
            return Response(
                {'error': 'Status is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        order.status = new_status
        order.save()
        serializer = self.get_serializer(order)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel an order and restore stock"""
        order = self.get_object()
        
        if order.status in ['delivered', 'cancelled']:
            return Response(
                {'error': f'Cannot cancel order with status: {order.status}'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # Restore stock
        for item in order.items.all():
            item.product.stock += item.quantity
            item.product.save()

        order.status = 'cancelled'
        order.save()
        
        serializer = self.get_serializer(order)
        return Response(serializer.data)


class ReviewViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Review CRUD operations.
    - List all reviews (optionally filtered by product)
    - Create review for a product
    - Update own review
    - Delete own review
    """
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self) -> QuerySet[Review]:
        queryset = Review.objects.all().order_by('-created_at')
        
        # Filter by product if provided
        product_id = self.request.query_params.get('product')  # type: ignore
        if product_id:
            queryset = queryset.filter(product_id=product_id)
        
        # Filter by user if provided
        if self.action in ['update', 'partial_update', 'destroy']:
            # Users can only modify their own reviews
            queryset = queryset.filter(user=self.request.user)
        
        return queryset

    def perform_create(self, serializer):
        """Create review and update product rating"""
        review = serializer.save(user=self.request.user)
        self._update_product_rating(review.product)

    def perform_update(self, serializer):
        """Update review and recalculate product rating"""
        review = serializer.save()
        self._update_product_rating(review.product)

    def perform_destroy(self, instance):
        """Delete review and recalculate product rating"""
        product = instance.product
        instance.delete()
        self._update_product_rating(product)

    def _update_product_rating(self, product):
        """Calculate and update product's average rating"""
        reviews = product.reviews.all()
        if reviews.exists():
            avg_rating = reviews.aggregate(Avg('rating'))['rating__avg']
            product.rating = round(avg_rating, 1)
            product.num_reviews = reviews.count()
        else:
            product.rating = 0.0
            product.num_reviews = 0
        product.save()


class AsyncProductListView(APIView):
    """Async endpoint for product listing (demo)"""
    permission_classes = [IsAuthenticatedOrReadOnly]

    async def get(self, request):
        from asgiref.sync import sync_to_async
        products = await sync_to_async(list)(Product.objects.all().order_by('-created_at'))
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
