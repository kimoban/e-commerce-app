from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import RegisterUserView, ForgotPasswordView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register_user'),
    path('password/forgot/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
