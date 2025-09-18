from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .tasks import send_welcome_email

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
            send_welcome_email.delay(email)
            return Response({'message': 'User registered and welcome email sent.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
