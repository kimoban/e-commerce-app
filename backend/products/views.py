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
		params = self.request.query_params
		# Support category by name (frontend sends blank for All)
		category = params.get('category')
		if category:
			# Try by name first, fall back to id if numeric
			if category.isdigit():
				queryset = queryset.filter(category__id=category)
			else:
				queryset = queryset.filter(category__name__iexact=category)
		# Support search via 'q'
		q = params.get('q')
		if q:
			queryset = queryset.filter(name__icontains=q) | queryset.filter(description__icontains=q)
		# Support sort=price or -price
		sort = params.get('sort')
		if sort in ['price', '-price']:
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

class AsyncProductListView(APIView):
	permission_classes = [IsAuthenticatedOrReadOnly]

	async def get(self, request):
		from asgiref.sync import sync_to_async
		products = await sync_to_async(list)(Product.objects.all().order_by('-created_at'))
		serializer = ProductSerializer(products, many=True)
		return Response(serializer.data)
