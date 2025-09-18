from celery import shared_task
from django.core.mail import send_mail

@shared_task
def send_welcome_email(user_email):
    send_mail(
        'Welcome to E-Commerce!',
        'Thank you for registering with us.',
        'noreply@ecommerce.com',
        [user_email],
        fail_silently=False,
    )

@shared_task
def process_order(order_id):
    # Simulate order processing logic
    from products.models import Order
    try:
        order = Order.objects.get(id=order_id)
        # Example: update status, send confirmation, etc.
        order.status = 'processed'
        order.save()
        send_mail(
            'Order Processed',
            f'Your order #{order_id} has been processed.',
            'noreply@ecommerce.com',
            [order.user.email],
            fail_silently=True,
        )
    except Exception as e:
        # Log error or send notification
        pass
