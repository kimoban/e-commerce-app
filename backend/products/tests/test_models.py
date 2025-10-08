import pytest
from django.contrib.auth.models import User
from products.models import (
    Category, Product, Address, Cart, CartItem, Order, OrderItem, Review
)


@pytest.mark.django_db
class TestModels:
    
    def test_category_creation(self):
        category = Category.objects.create(
            name='Electronics',
            description='Electronic items'
        )
        assert str(category) == 'Electronics'
        assert category.name == 'Electronics'
    
    def test_product_creation(self):
        category = Category.objects.create(name='Books')
        product = Product.objects.create(
            name='Test Book',
            description='A test book',
            price=29.99,
            category=category,
            stock=50
        )
        assert str(product) == 'Test Book'
        assert product.price == 29.99
        assert product.category == category
    
    def test_address_creation(self):
        user = User.objects.create_user(username='testuser', password='test123')
        address = Address.objects.create(
            user=user,
            street='123 Main St',
            city='New York',
            state='NY',
            country='USA',
            postal_code='10001'
        )
        assert str(address) == '123 Main St, New York'
        assert address.user == user
    
    def test_cart_creation(self):
        user = User.objects.create_user(username='testuser', password='test123')
        cart = Cart.objects.create(user=user)
        assert cart.user == user
        assert cart.items.count() == 0
    
    def test_cart_item_creation(self):
        user = User.objects.create_user(username='testuser', password='test123')
        category = Category.objects.create(name='Electronics')
        product = Product.objects.create(
            name='Laptop',
            price=999.99,
            category=category,
            stock=10
        )
        cart = Cart.objects.create(user=user)
        cart_item = CartItem.objects.create(
            cart=cart,
            product=product,
            quantity=2
        )
        assert cart_item.quantity == 2
        assert cart_item.product == product
    
    def test_order_creation(self):
        user = User.objects.create_user(username='testuser', password='test123')
        order = Order.objects.create(
            user=user,
            total=199.99,
            status='pending'
        )
        assert order.user == user
        assert order.total == 199.99
        assert order.status == 'pending'
    
    def test_order_item_creation(self):
        user = User.objects.create_user(username='testuser', password='test123')
        category = Category.objects.create(name='Electronics')
        product = Product.objects.create(
            name='Phone',
            price=699.99,
            category=category
        )
        order = Order.objects.create(user=user, total=699.99)
        order_item = OrderItem.objects.create(
            order=order,
            product=product,
            quantity=1,
            price=699.99
        )
        assert order_item.order == order
        assert order_item.product == product
        assert order_item.price == 699.99
    
    def test_review_creation(self):
        user = User.objects.create_user(username='testuser', password='test123')
        category = Category.objects.create(name='Electronics')
        product = Product.objects.create(
            name='Headphones',
            price=99.99,
            category=category
        )
        review = Review.objects.create(
            user=user,
            product=product,
            rating=5,
            comment='Excellent product!'
        )
        assert review.user == user
        assert review.product == product
        assert review.rating == 5
    
    def test_product_reviews_relationship(self):
        user = User.objects.create_user(username='testuser', password='test123')
        category = Category.objects.create(name='Electronics')
        product = Product.objects.create(
            name='Camera',
            price=499.99,
            category=category
        )
        Review.objects.create(user=user, product=product, rating=4)
        Review.objects.create(
            user=User.objects.create_user(username='user2', password='test123'),
            product=product,
            rating=5
        )
        
        assert product.reviews.count() == 2
    
    def test_category_products_relationship(self):
        category = Category.objects.create(name='Electronics')
        Product.objects.create(name='Product 1', price=10, category=category)
        Product.objects.create(name='Product 2', price=20, category=category)
        
        assert category.products.count() == 2
    
    def test_user_addresses_relationship(self):
        user = User.objects.create_user(username='testuser', password='test123')
        Address.objects.create(
            user=user, street='123 St', city='City',
            state='State', country='Country', postal_code='12345'
        )
        Address.objects.create(
            user=user, street='456 Ave', city='City',
            state='State', country='Country', postal_code='67890'
        )
        
        assert user.addresses.count() == 2
    
    def test_user_orders_relationship(self):
        user = User.objects.create_user(username='testuser', password='test123')
        Order.objects.create(user=user, total=100)
        Order.objects.create(user=user, total=200)
        
        assert user.orders.count() == 2
    
    def test_order_items_relationship(self):
        user = User.objects.create_user(username='testuser', password='test123')
        category = Category.objects.create(name='Electronics')
        product1 = Product.objects.create(name='Product 1', price=50, category=category)
        product2 = Product.objects.create(name='Product 2', price=100, category=category)
        
        order = Order.objects.create(user=user, total=150)
        OrderItem.objects.create(order=order, product=product1, quantity=1, price=50)
        OrderItem.objects.create(order=order, product=product2, quantity=1, price=100)
        
        assert order.items.count() == 2
    
    def test_default_address_behavior(self):
        user = User.objects.create_user(username='testuser', password='test123')
        address1 = Address.objects.create(
            user=user, street='123 St', city='City',
            state='State', country='Country', postal_code='12345',
            is_default=True
        )
        assert address1.is_default is True
        
        # Creating another default address
        address2 = Address.objects.create(
            user=user, street='456 Ave', city='City',
            state='State', country='Country', postal_code='67890',
            is_default=False
        )
        assert address2.is_default is False
