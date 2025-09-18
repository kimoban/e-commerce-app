import pytest
from products.models import Product, Category

@pytest.mark.django_db
def test_product_creation():
    category = Category.objects.create(name="Test Category")
    product = Product.objects.create(
        name="Test Product",
        description="A test product.",
        price=9.99,
        category=category
    )
    assert product.name == "Test Product"
    assert product.category == category
