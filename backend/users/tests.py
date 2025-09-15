from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class UserModelTest(TestCase):
	def test_create_user(self):
		user = User.objects.create_user(username="testuser", password="testpass")
		self.assertEqual(user.username, "testuser")
		self.assertTrue(user.check_password("testpass"))
from django.test import TestCase

# Create your tests here.
