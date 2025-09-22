from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework.test import APIClient

User = get_user_model()


class UserModelTest(TestCase):
	def test_create_user(self):
		user = User.objects.create_user(username="testuser", password="testpass")
		self.assertEqual(user.username, "testuser")
		self.assertTrue(user.check_password("testpass"))


class ExchangeEndpointsTests(TestCase):
	def setUp(self):
		self.client = APIClient()

	def test_google_exchange_requires_token(self):
		url = reverse('google_exchange')
		resp = self.client.post(url, data={}, format='json', secure=True)
		self.assertEqual(resp.status_code, 400)
		self.assertIn('error', resp.json())

	def test_facebook_exchange_requires_token(self):
		url = reverse('facebook_exchange')
		resp = self.client.post(url, data={}, format='json', secure=True)
		self.assertEqual(resp.status_code, 400)
		self.assertIn('error', resp.json())

	def test_google_exchange_creates_and_returns_jwt_and_user(self):
		url = reverse('google_exchange')
		resp = self.client.post(url, data={"access_token": "dev-token-12345678"}, format='json', secure=True)
		self.assertEqual(resp.status_code, 200)
		payload = resp.json()
		self.assertIn('token', payload)
		self.assertIn('user', payload)
		user = payload['user']
		self.assertIn('id', user)
		self.assertIn('email', user)
		self.assertTrue(User.objects.filter(email=user['email']).exists())

	def test_facebook_exchange_creates_and_returns_jwt_and_user(self):
		url = reverse('facebook_exchange')
		resp = self.client.post(url, data={"access_token": "fb-token-abcdef12"}, format='json', secure=True)
		self.assertEqual(resp.status_code, 200)
		payload = resp.json()
		self.assertIn('token', payload)
		self.assertIn('user', payload)
		user = payload['user']
		self.assertIn('id', user)
		self.assertIn('email', user)
		self.assertTrue(User.objects.filter(email=user['email']).exists())
