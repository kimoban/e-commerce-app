from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.urls import reverse
from django.conf import settings
from .tasks import send_welcome_email, send_password_reset_email

class RegisterUserView(APIView):
    from rest_framework.permissions import AllowAny
    permission_classes = [AllowAny]
    def post(self, request):
        from django.contrib.auth.models import User
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            if not email or not password:
                return Response({'error': 'Email and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(email=email).exists():
                return Response({'error': 'User with this email already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            user = User.objects.create_user(username=email, email=email, password=password)
            send_welcome_email(email)
            return Response({'message': 'User registered and welcome email sent.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ForgotPasswordView(APIView):
    from rest_framework.permissions import AllowAny
    permission_classes = [AllowAny]

    def post(self, request):
        from django.contrib.auth.models import User
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            # Always respond 200 to avoid account enumeration
            user = User.objects.filter(email=email).first()
            if user:
                # In a real app, generate a token and link; here we simulate a link
                token = 'dummy-reset-token'
                frontend_base = getattr(settings, 'FRONTEND_BASE_URL', 'http://localhost:8082')
                reset_link = f"{frontend_base}/reset-password?token={token}&email={email}"
                # If Celery is configured, prefer: send_password_reset_email.delay(email, reset_link)
                send_password_reset_email(email, reset_link)
            return Response({'message': 'If the email exists, a reset link will be sent.'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
