# E-Commerce Backend (Django)

This is the backend API for the E-Commerce Mobile App, built with Django and Django REST Framework. It provides secure, scalable endpoints for product management, user authentication, cart operations, and more.

## Features

- **RESTful API** for all product, cart, and user operations
- **JWT Authentication** for secure login and registration
- **Product Management**: CRUD for products and categories
- **User Management**: Registration, login, and profile endpoints
- **Cart Management**: Add, update, and remove items from cart
- **PostgreSQL** as the production database
- **Admin Panel** for easy management

## Tech Stack

- Python 3.10+
- Django
- Django REST Framework
- PostgreSQL
- djangorestframework-simplejwt (JWT auth)

## Project Structure

```bash
backend/
├── ecommerce/           # Django project settings
│   ├── settings.py      # Main settings (configure DB, JWT, etc.)
│   ├── urls.py          # Project URL routing
│   └── ...
├── products/            # Product app (models, views, serializers)
├── users/               # User app (models, views, serializers)
├── manage.py            # Django management script
└── requirements.txt     # Python dependencies
```

## Getting Started

### Prerequisites

- Python 3.10+
- PostgreSQL

### Setup

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Create and activate a virtual environment:

   ```sh
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. Install dependencies:

   ```sh
   pip install -r requirements.txt
   ```

4. Configure your PostgreSQL database in `ecommerce/settings.py`.
5. Run migrations and start the server:

   ```sh
   python manage.py migrate
   python manage.py runserver
   ```

## API Endpoints

- `/api/products/` — List, create, update, delete products
- `/api/categories/` — List, create, update, delete categories
- `/api/cart/` — Manage cart items
- `/api/users/` — Register, login, profile

## Environment Variables

- Set your database credentials and secret keys in environment variables or `settings.py`.

## Testing

- Run tests with:

  ```sh
  python manage.py test
  ```

## License

[ISAIAH KIMOBAN N-YILYAL](../LICENSE)

---
> This backend powers the E-Commerce Mobile App with robust, secure, and scalable APIs.
