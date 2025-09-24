# E-Commerce Backend (Django)

Backend API for the E-Commerce app, built with Django and Django REST Framework. Provides product/catalog endpoints, JWT auth, provider token exchange (Google/Facebook), and a dev-friendly forgot-password flow.

## Features

- **Products/Categories** with search, filter, and sort
- **JWT Authentication** for secure login and registration
- **Provider token exchange** endpoints for Google and Facebook
- **Forgot Password** endpoint (sends a simulated email with a reset link)
- **PostgreSQL** support via `DATABASE_URL`

## Tech Stack

- Python 3.10+
- Django
- Django REST Framework
- PostgreSQL
- djangorestframework-simplejwt (JWT auth)

## Project Structure

```bash
backend/
├── ecommerce/
│   ├── asgi.py
│   ├── celery.py
│   ├── settings.py        # Settings (DATABASE_URL, CORS, JWT, static)
│   ├── urls.py            # Root URLConf (swagger/redoc, includes apps)
│   ├── views_and_root_urls.py
│   ├── wsgi.py
│   └── __init__.py
├── products/
│   ├── admin.py
│   ├── apps.py
│   ├── migrations/
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py            # Registers routers for products/categories
│   ├── views.py           # Pagination via page/limit, q, category, sort
│   ├── tests/
│   │   └── tests.py
│   └── __init__.py
├── users/
│   ├── urls.py            # /api/auth/register, /password/forgot, /google/exchange, /facebook/exchange
│   ├── views.py           # Exchange providers, register, forgot password
│   └── __init__.py
├── manage.py
├── requirements.txt
└── README.md
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

4. Configure your PostgreSQL database via `DATABASE_URL` or edit `ecommerce/settings.py`.
5. Run migrations and start the server:

   ```sh
   python manage.py migrate
   python manage.py runserver
   ```

## API Endpoints

- `GET /api/products/` — List products with `page`, `limit`, `q`, `category`, `sort`
- `GET /api/categories/` — List categories
- `POST /api/auth/register/` — Create user
- `POST /api/auth/password/forgot/` — Request password reset (dev simulation)
- `POST /api/auth/google/exchange/` — Exchange Google access_token for JWT
- `POST /api/auth/facebook/exchange/` — Exchange Facebook access_token for JWT
- `POST /api/auth/token/` — Obtain JWT (username/password)
- `POST /api/auth/token/refresh/` — Refresh access token

## Environment Variables

Set via your process manager/host environment:

- `DATABASE_URL` — e.g., `postgres://user:pass@host:5432/dbname`
- `DJANGO_SECRET_KEY`
- `DEBUG` — `True`/`False`
- `ALLOWED_HOSTS` — include hostnames/domains (e.g., Render/Heroku + localhost)
- `CORS_ALLOWED_ORIGINS` — include your Vercel domain(s) and local frontend URL

Optional:

- `FRONTEND_BASE_URL` — used to construct password reset links in dev

## Testing

Run tests:

```sh
python manage.py test
```

Includes tests for token exchange endpoints in `users/tests.py`.

## License

[ISAIAH KIMOBAN N-YILYAL](../LICENSE)

---
> This backend powers the E-Commerce Mobile App with robust, secure, and scalable APIs.
