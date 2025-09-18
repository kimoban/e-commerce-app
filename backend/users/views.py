from django.shortcuts import render
from django.http import JsonResponse
from .tasks import send_welcome_email

def register_user(request):
	if request.method == 'POST':
		email = request.POST.get('email')
		# ...user creation logic...
		send_welcome_email.delay(email)
		return JsonResponse({'message': 'User registered and welcome email sent.'})
