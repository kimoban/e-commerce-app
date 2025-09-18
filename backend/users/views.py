from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .tasks import send_welcome_email

class RegisterUserView(APIView):
    from rest_framework.permissions import AllowAny
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get('email')
        # ...user creation logic...
        send_welcome_email.delay(email)
        return Response({'message': 'User registered and welcome email sent.'}, status=status.HTTP_201_CREATED)
