from django.http import JsonResponse, HttpResponse
from django.urls import path

def homepage(request):
    return HttpResponse("<h1>Welcome to the E-Commerce API</h1>")

def api_root(request):
    return JsonResponse({
        "products": "/api/products/",
        "users": "/api/users/",
        "docs": "/swagger/"
    })

urlpatterns = [
    path('', homepage, name='homepage'),
    path('api/', api_root, name='api-root'),
]
