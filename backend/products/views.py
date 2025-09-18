from rest_framework import viewsets, filters
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from django_filters.rest_framework import DjangoFilterBackend

class CategoryViewSet(viewsets.ModelViewSet):
	queryset = Category.objects.all().order_by('name')
	serializer_class = CategorySerializer
	permission_classes = [IsAuthenticatedOrReadOnly]
	filter_backends = [filters.SearchFilter, filters.OrderingFilter]
	search_fields = ['name', 'description']
	ordering_fields = ['name', 'created_at']

class ProductViewSet(viewsets.ModelViewSet):
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
		category = self.request.query_params.get('category')
		if category:
			queryset = queryset.filter(category__id=category)
		min_price = self.request.query_params.get('min_price')
		max_price = self.request.query_params.get('max_price')
		if min_price:
			queryset = queryset.filter(price__gte=min_price)
		if max_price:
			queryset = queryset.filter(price__lte=max_price)
		return queryset

class AsyncProductListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    async def get(self, request):
        # Example async ORM usage (Django 4.1+)
        products = await Product.objects.all().order_by('-created_at').aget()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
