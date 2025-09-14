from rest_framework import viewsets, filters
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

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
	filter_backends = [filters.SearchFilter, filters.OrderingFilter]
	search_fields = ['name', 'description', 'brand']
	ordering_fields = ['price', 'created_at', 'rating', 'stock']
	ordering = ['-created_at']
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
