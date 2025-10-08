import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status
from products.models import (
    Category, Product, Address, Cart, CartItem, Order, OrderItem, Review
)


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def user(db):
    return User.objects.create_user(username='testuser', email='test@example.com', password='testpass123')


@pytest.fixture
def authenticated_client(api_client, user):
    api_client.force_authenticate(user=user)
    return api_client


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


# ==================== CATEGORY TESTS ====================

@pytest.mark.django_db
class TestCategoryViewSet:
    def test_list_categories(self, api_client, category):
        response = api_client.get('/api/categories/')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        assert response.data[0]['name'] == 'Electronics'

    def test_create_category_authenticated(self, authenticated_client):
        data = {'name': 'Books', 'description': 'Book items'}
        response = authenticated_client.post('/api/categories/', data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Category.objects.filter(name='Books').exists()

    def test_create_category_unauthenticated(self, api_client):
        data = {'name': 'Books', 'description': 'Book items'}
        response = api_client.post('/api/categories/', data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_retrieve_category(self, api_client, category):
        response = api_client.get(f'/api/categories/{category.id}/')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['name'] == 'Electronics'

    def test_update_category(self, authenticated_client, category):
        data = {'name': 'Updated Electronics'}
        response = authenticated_client.patch(f'/api/categories/{category.id}/', data)
        assert response.status_code == status.HTTP_200_OK
        category.refresh_from_db()
        assert category.name == 'Updated Electronics'

    def test_delete_category(self, authenticated_client, category):
        response = authenticated_client.delete(f'/api/categories/{category.id}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not Category.objects.filter(id=category.id).exists()


# ==================== PRODUCT TESTS ====================

@pytest.mark.django_db
class TestProductViewSet:
    def test_list_products(self, api_client, product):
        response = api_client.get('/api/products/')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['total'] == 1
        assert len(response.data['items']) == 1

    def test_filter_products_by_category(self, api_client, product, category):
        response = api_client.get(f'/api/products/?category={category.id}')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['total'] == 1

    def test_search_products(self, api_client, product):
        response = api_client.get('/api/products/?q=Test')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['total'] == 1

    def test_create_product(self, authenticated_client, category):
        data = {
            'name': 'New Product',
            'description': 'A new product',
            'price': 49.99,
            'category_id': category.id,
            'stock': 5
        }
        response = authenticated_client.post('/api/products/', data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Product.objects.filter(name='New Product').exists()

    def test_retrieve_product(self, api_client, product):
        response = api_client.get(f'/api/products/{product.id}/')
        assert response.status_code == status.HTTP_200_OK
        assert response.data['name'] == 'Test Product'

    def test_update_product(self, authenticated_client, product):
        data = {'price': 79.99}
        response = authenticated_client.patch(f'/api/products/{product.id}/', data)
        assert response.status_code == status.HTTP_200_OK
        product.refresh_from_db()
        assert product.price == 79.99

    def test_delete_product(self, authenticated_client, product):
        response = authenticated_client.delete(f'/api/products/{product.id}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not Product.objects.filter(id=product.id).exists()


# ==================== ADDRESS TESTS ====================

@pytest.mark.django_db
class TestAddressViewSet:
    def test_list_user_addresses(self, authenticated_client, user):
        Address.objects.create(
            user=user,
            street='123 Main St',
            city='City',
            state='State',
            country='Country',
            postal_code='12345'
        )
        response = authenticated_client.get('/api/addresses/')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

    def test_create_address(self, authenticated_client):
        data = {
            'street': '456 Oak Ave',
            'city': 'New City',
            'state': 'New State',
            'country': 'New Country',
            'postal_code': '67890',
            'is_default': True
        }
        response = authenticated_client.post('/api/addresses/', data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Address.objects.filter(postal_code='67890').exists()

    def test_set_default_address(self, authenticated_client, user):
        address1 = Address.objects.create(
            user=user, street='123 Main St', city='City',
            state='State', country='Country', postal_code='12345', is_default=True
        )
        address2 = Address.objects.create(
            user=user, street='456 Oak Ave', city='City',
            state='State', country='Country', postal_code='67890', is_default=False
        )
        
        response = authenticated_client.post(f'/api/addresses/{address2.id}/set_default/')
        assert response.status_code == status.HTTP_200_OK
        
        address1.refresh_from_db()
        address2.refresh_from_db()
        assert not address1.is_default
        assert address2.is_default


# ==================== CART TESTS ====================

@pytest.mark.django_db
class TestCartViewSet:
    def test_retrieve_cart(self, authenticated_client):
        response = authenticated_client.get('/api/cart/me/')
        # The endpoint will create a cart if it doesn't exist
        assert response.status_code == status.HTTP_200_OK

    def test_clear_cart(self, authenticated_client, user, product):
        cart = Cart.objects.create(user=user)
        CartItem.objects.create(cart=cart, product=product, quantity=2)
        
        response = authenticated_client.delete('/api/cart/clear/')
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert cart.items.count() == 0


@pytest.mark.django_db
class TestCartItemViewSet:
    def test_add_item_to_cart(self, authenticated_client, product):
        data = {'product_id': product.id, 'quantity': 2}
        response = authenticated_client.post('/api/cart-items/', data)
        assert response.status_code == status.HTTP_201_CREATED
        assert CartItem.objects.filter(product=product).exists()

    def test_update_cart_item_quantity(self, authenticated_client, user, product):
        cart = Cart.objects.create(user=user)
        cart_item = CartItem.objects.create(cart=cart, product=product, quantity=1)
        
        data = {'quantity': 5}
        response = authenticated_client.patch(f'/api/cart-items/{cart_item.id}/', data)
        assert response.status_code == status.HTTP_200_OK
        cart_item.refresh_from_db()
        assert cart_item.quantity == 5

    def test_add_duplicate_item_increases_quantity(self, authenticated_client, user, product):
        cart = Cart.objects.create(user=user)
        CartItem.objects.create(cart=cart, product=product, quantity=2)
        
        data = {'product_id': product.id, 'quantity': 3}
        response = authenticated_client.post('/api/cart-items/', data)
        assert response.status_code == status.HTTP_200_OK
        
        cart_item = CartItem.objects.get(cart=cart, product=product)
        assert cart_item.quantity == 5

    def test_delete_cart_item(self, authenticated_client, user, product):
        cart = Cart.objects.create(user=user)
        cart_item = CartItem.objects.create(cart=cart, product=product, quantity=2)
        
        response = authenticated_client.delete(f'/api/cart-items/{cart_item.id}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT
        assert not CartItem.objects.filter(id=cart_item.id).exists()


# ==================== ORDER TESTS ====================

@pytest.mark.django_db
class TestOrderViewSet:
    def test_create_order_from_cart(self, authenticated_client, user, product):
        cart = Cart.objects.create(user=user)
        CartItem.objects.create(cart=cart, product=product, quantity=2)
        
        response = authenticated_client.post('/api/orders/', {})
        assert response.status_code == status.HTTP_201_CREATED
        assert Order.objects.filter(user=user).exists()
        
        order = Order.objects.get(user=user)
        assert order.total == product.price * 2
        assert order.items.count() == 1
        assert cart.items.count() == 0  # Cart should be cleared

    def test_create_order_empty_cart(self, authenticated_client):
        response = authenticated_client.post('/api/orders/', {})
        assert response.status_code == status.HTTP_400_BAD_REQUEST
        assert 'Cart is empty' in str(response.data)

    def test_list_user_orders(self, authenticated_client, user, product):
        cart = Cart.objects.create(user=user)
        CartItem.objects.create(cart=cart, product=product, quantity=1)
        authenticated_client.post('/api/orders/', {})
        
        response = authenticated_client.get('/api/orders/')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

    def test_update_order_status(self, authenticated_client, user, product):
        order = Order.objects.create(user=user, total=99.99, status='pending')
        
        response = authenticated_client.patch(f'/api/orders/{order.id}/update_status/', {'status': 'shipped'})
        assert response.status_code == status.HTTP_200_OK
        order.refresh_from_db()
        assert order.status == 'shipped'

    def test_cancel_order(self, authenticated_client, user, product):
        order = Order.objects.create(user=user, total=199.98, status='pending')
        OrderItem.objects.create(order=order, product=product, quantity=2, price=product.price)
        
        original_stock = product.stock
        product.stock -= 2
        product.save()
        
        response = authenticated_client.post(f'/api/orders/{order.id}/cancel/')
        assert response.status_code == status.HTTP_200_OK
        
        order.refresh_from_db()
        product.refresh_from_db()
        assert order.status == 'cancelled'
        assert product.stock == original_stock  # Stock restored

    def test_cannot_cancel_delivered_order(self, authenticated_client, user):
        order = Order.objects.create(user=user, total=99.99, status='delivered')
        
        response = authenticated_client.post(f'/api/orders/{order.id}/cancel/')
        assert response.status_code == status.HTTP_400_BAD_REQUEST


# ==================== REVIEW TESTS ====================

@pytest.mark.django_db
class TestReviewViewSet:
    def test_create_review(self, authenticated_client, product):
        data = {
            'product': product.id,
            'rating': 5,
            'comment': 'Great product!'
        }
        response = authenticated_client.post('/api/reviews/', data)
        assert response.status_code == status.HTTP_201_CREATED
        assert Review.objects.filter(product=product).exists()
        
        # Check product rating updated
        product.refresh_from_db()
        assert product.rating == 5.0
        assert product.num_reviews == 1

    def test_prevent_duplicate_review(self, authenticated_client, user, product):
        Review.objects.create(user=user, product=product, rating=4, comment='First review')
        
        data = {
            'product': product.id,
            'rating': 5,
            'comment': 'Second review'
        }
        response = authenticated_client.post('/api/reviews/', data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_update_review(self, authenticated_client, user, product):
        review = Review.objects.create(user=user, product=product, rating=3, comment='OK product')
        
        data = {'rating': 5, 'comment': 'Actually great!'}
        response = authenticated_client.patch(f'/api/reviews/{review.id}/', data)
        assert response.status_code == status.HTTP_200_OK
        
        review.refresh_from_db()
        assert review.rating == 5

    def test_delete_review_updates_product_rating(self, authenticated_client, user, product):
        review = Review.objects.create(user=user, product=product, rating=5)
        
        response = authenticated_client.delete(f'/api/reviews/{review.id}/')
        assert response.status_code == status.HTTP_204_NO_CONTENT
        
        product.refresh_from_db()
        assert product.rating == 0.0
        assert product.num_reviews == 0

    def test_list_reviews_by_product(self, api_client, user, product):
        Review.objects.create(user=user, product=product, rating=5, comment='Great!')
        
        response = api_client.get(f'/api/reviews/?product={product.id}')
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1

    def test_rating_validation(self, authenticated_client, product):
        data = {
            'product': product.id,
            'rating': 6,  # Invalid rating
            'comment': 'Too high rating'
        }
        response = authenticated_client.post('/api/reviews/', data)
        assert response.status_code == status.HTTP_400_BAD_REQUEST
