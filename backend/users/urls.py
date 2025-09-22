from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import RegisterUserView, ForgotPasswordView, GoogleExchangeView, FacebookExchangeView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register_user'),
    path('password/forgot/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('google/exchange/', GoogleExchangeView.as_view(), name='google_exchange'),
    path('facebook/exchange/', FacebookExchangeView.as_view(), name='facebook_exchange'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
