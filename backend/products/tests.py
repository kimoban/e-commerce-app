from django.test import TestCase
from .models import Product, Category

class ProductModelTest(TestCase):
	def setUp(self):
		self.category = Category.objects.create(name="Electronics")
		self.product = Product.objects.create(
			name="Test Product",
			price=99.99,
			category=self.category
		)

	def test_product_creation(self):
		self.assertEqual(self.product.name, "Test Product")
		self.assertEqual(self.product.category.name, "Electronics")
		self.assertEqual(float(self.product.price), 99.99)
from django.test import TestCase

# Create your tests here.
