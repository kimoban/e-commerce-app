
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
