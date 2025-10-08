import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory
from products.models import Category, Product, Address, Cart, CartItem, Review
from products.serializers import (
    CategorySerializer, ProductSerializer, AddressSerializer,
    CartSerializer, CartItemSerializer, ReviewSerializer
)


@pytest.fixture
def factory():
    return APIRequestFactory()


@pytest.fixture
def user(db):
    return User.objects.create_user(username='testuser', password='test123')


@pytest.fixture
def category(db):
    return Category.objects.create(name='Electronics', description='Electronic items')


@pytest.fixture
def product(db, category):
    return Product.objects.create(
        name='Test Product',
        description='A test product',
        price=99.99,
        category=category,
        stock=10
    )


@pytest.mark.django_db
class TestCategorySerializer:
    
    def test_serialize_category(self, category):
        serializer = CategorySerializer(category)
        data = serializer.data
        
        assert data['name'] == 'Electronics'
        assert data['description'] == 'Electronic items'
        assert 'products_count' in data
    
    def test_deserialize_category(self):
        data = {
            'name': 'Books',
            'description': 'Book items'
        }
        serializer = CategorySerializer(data=data)
        assert serializer.is_valid()
        category = serializer.save()
        assert category.name == 'Books'


@pytest.mark.django_db
class TestProductSerializer:
    
    def test_serialize_product(self, product):
        serializer = ProductSerializer(product)
        data = serializer.data
        
        assert data['name'] == 'Test Product'
        assert float(data['price']) == 99.99
        assert 'category' in data
        assert data['category']['name'] == 'Electronics'
    
    def test_deserialize_product(self, category):
        data = {
            'name': 'New Product',
            'description': 'A new product',
            'price': 49.99,
            'category_id': category.id,
            'stock': 5
        }
        serializer = ProductSerializer(data=data)
        assert serializer.is_valid()
        product = serializer.save()
        assert product.name == 'New Product'
        assert product.category == category


@pytest.mark.django_db
class TestAddressSerializer:
    
    def test_serialize_address(self, user):
        address = Address.objects.create(
            user=user,
            street='123 Main St',
            city='New York',
            state='NY',
            country='USA',
            postal_code='10001',
            is_default=True
        )
        serializer = AddressSerializer(address)
        data = serializer.data
        
        assert data['street'] == '123 Main St'
        assert data['city'] == 'New York'
        assert data['is_default'] is True
    
    def test_deserialize_address(self, user, factory):
        data = {
            'street': '456 Oak Ave',
            'city': 'Los Angeles',
            'state': 'CA',
            'country': 'USA',
            'postal_code': '90001',
            'is_default': True
        }
        request = factory.post('/api/addresses/')
        request.user = user
        
        serializer = AddressSerializer(data=data, context={'request': request})
        assert serializer.is_valid()
        address = serializer.save(user=user)
        assert address.street == '456 Oak Ave'
        assert address.user == user


@pytest.mark.django_db
class TestCartSerializer:
    
    def test_serialize_cart(self, user, product):
        cart = Cart.objects.create(user=user)
        CartItem.objects.create(cart=cart, product=product, quantity=2)
        
        serializer = CartSerializer(cart)
        data = serializer.data
        
        assert 'items' in data
        assert len(data['items']) == 1
        assert 'total' in data
        assert data['items_count'] == 2


@pytest.mark.django_db
class TestCartItemSerializer:
    
    def test_serialize_cart_item(self, user, product):
        cart = Cart.objects.create(user=user)
        cart_item = CartItem.objects.create(cart=cart, product=product, quantity=3)
        
        serializer = CartItemSerializer(cart_item)
        data = serializer.data
        
        assert data['quantity'] == 3
        assert 'product' in data
        assert data['product']['name'] == 'Test Product'
        assert 'subtotal' in data
    
    def test_deserialize_cart_item(self, product):
        data = {
            'product_id': product.id,
            'quantity': 5
        }
        serializer = CartItemSerializer(data=data)
        assert serializer.is_valid()
    
    def test_validate_quantity_minimum(self, product):
        data = {
            'product_id': product.id,
            'quantity': 0
        }
        serializer = CartItemSerializer(data=data)
        assert not serializer.is_valid()
        assert 'quantity' in serializer.errors
    
    def test_validate_stock_availability(self, product):
        # Product has stock of 10
        data = {
            'product_id': product.id,
            'quantity': 15  # More than stock
        }
        serializer = CartItemSerializer(data=data)
        assert not serializer.is_valid()


@pytest.mark.django_db
class TestReviewSerializer:
    
    def test_serialize_review(self, user, product):
        review = Review.objects.create(
            user=user,
            product=product,
            rating=5,
            comment='Great product!'
        )
        serializer = ReviewSerializer(review)
        data = serializer.data
        
        assert data['rating'] == 5
        assert data['comment'] == 'Great product!'
        assert data['user_name'] == 'testuser'
        assert 'product_name' in data
    
    def test_deserialize_review(self, user, product, factory):
        data = {
            'product': product.id,
            'rating': 4,
            'comment': 'Good product'
        }
        request = factory.post('/api/reviews/')
        request.user = user
        
        serializer = ReviewSerializer(data=data, context={'request': request})
        assert serializer.is_valid()
        review = serializer.save(user=user)
        assert review.rating == 4
        assert review.user == user
    
    def test_validate_rating_range(self, user, product, factory):
        data = {
            'product': product.id,
            'rating': 6,  # Invalid
            'comment': 'Test'
        }
        request = factory.post('/api/reviews/')
        request.user = user
        
        serializer = ReviewSerializer(data=data, context={'request': request})
        assert not serializer.is_valid()
        assert 'rating' in serializer.errors
    
    def test_prevent_duplicate_reviews(self, user, product, factory):
        # Create first review
        Review.objects.create(user=user, product=product, rating=4)
        
        # Try to create second review
        data = {
            'product': product.id,
            'rating': 5,
            'comment': 'Another review'
        }
        request = factory.post('/api/reviews/')
        request.user = user
        
        serializer = ReviewSerializer(data=data, context={'request': request})
        assert not serializer.is_valid()
