

from django.db import models

class Category(models.Model):
	name = models.CharField(max_length=100, unique=True)
	description = models.TextField(blank=True)
	image = models.URLField(blank=True, help_text="Category image URL")
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.name


class Product(models.Model):
	name = models.CharField(max_length=200)
	description = models.TextField()
	price = models.DecimalField(max_digits=10, decimal_places=2)
	category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
	image = models.URLField(blank=True, help_text="Product image URL")
	brand = models.CharField(max_length=100, blank=True)
	stock = models.PositiveIntegerField(default=0)
	rating = models.FloatField(default=0.0)
	num_reviews = models.PositiveIntegerField(default=0)
	is_active = models.BooleanField(default=True)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.name

# --- Additional Models for Normalization & Scalability ---
from django.conf import settings

class Address(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='addresses')
	street = models.CharField(max_length=255)
	city = models.CharField(max_length=100)
	state = models.CharField(max_length=100)
	country = models.CharField(max_length=100)
	postal_code = models.CharField(max_length=20)
	is_default = models.BooleanField(default=False)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return f"{self.street}, {self.city}"

class Cart(models.Model):
	user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart')
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

class CartItem(models.Model):
	cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
	product = models.ForeignKey(Product, on_delete=models.CASCADE)
	quantity = models.PositiveIntegerField(default=1)
	added_at = models.DateTimeField(auto_now_add=True)

class Order(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
	address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True, blank=True)
	total = models.DecimalField(max_digits=10, decimal_places=2)
	status = models.CharField(max_length=30, default='pending')
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

class OrderItem(models.Model):
	order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
	product = models.ForeignKey(Product, on_delete=models.CASCADE)
	quantity = models.PositiveIntegerField(default=1)
	price = models.DecimalField(max_digits=10, decimal_places=2)

class Review(models.Model):
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reviews')
	product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
	rating = models.PositiveIntegerField()
	comment = models.TextField(blank=True)
	created_at = models.DateTimeField(auto_now_add=True)
