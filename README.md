# E-Commerce App (Django + Expo)

A modern, full-stack e-commerce application built with Django REST Framework (backend) and Expo React Native (frontend) with web export. The app supports social auth token exchange endpoints, infinite product lists with filters/sort, and static web deployment to Vercel.

## Table of Contents

- [Features](#features)  
      - [Backend Features](#backend-features)  
      - [Frontend Features](#frontend-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)  
      - [Prerequisites](#prerequisites)  
      - [Backend Setup (Django)](#backend-setup-django)  
      - [Frontend Setup (Expo React Native)](#frontend-setup-expo-react-native)  
- [Environment Variables](#environment-variables)
- [Customization & Branding](#customization--branding)
- [Scripts](#scripts)
- [Deploy to Vercel](#deploy-to-vercel)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### Backend Features

- **RESTful API**: Django REST Framework for products and categories
- **Authentication**: JWT-based flows plus provider token exchange endpoints (Google/Facebook)
- **Products API**: Pagination (page, limit), search (q), filters (category), and sort (price/-price)
- **Forgot Password**: Endpoint that simulates email sending (extend in production)
- **Database**: PostgreSQL (via DATABASE_URL), local dev compatible

### Frontend Features

- **Catalog**: Infinite scroll with refresh; search, category filter, sort
- **Auth**: Username/password; Google and Facebook via Expo AuthSession (web requires client IDs)
- **State**: Redux Toolkit with JWT persistence and centralized fetch attaching Authorization
- **UI**: NativeWind/Tailwind; responsive web layout; accessible interactions
- **Web Export**: Static build with SPA rewrites and caching headers via `vercel.json`

## Tech Stack

### Frontend

- [Expo React Native](https://expo.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript](https://www.typescriptlang.org/)

### Backend

- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT Authentication](https://jwt.io/)

## Project Structure

```bash
E-Commerce/
├── backend/                        # Django backend (API, models, auth, etc.)
│   ├── ecommerce/                  # Django project
│   │   ├── settings.py             # Settings (DB, CORS, JWT, static)
│   │   ├── urls.py                 # Root urls (includes products/users, swagger)
│   │   ├── views_and_root_urls.py  # Any root views
│   │   ├── wsgi.py / asgi.py       # Entrypoints
│   │   └── celery.py               # Celery config (broker/result)
│   ├── products/                   # Product app
│   │   ├── models.py               # Product/Category models
│   │   ├── views.py                # ViewSets with page/limit/q/category/sort
│   │   ├── serializers.py          # DRF serializers
│   │   ├── urls.py                 # Router for products/categories
│   │   └── tests/                  # Tests for product endpoints
│   ├── users/                      # Users/Auth app
│   │   ├── views.py                # Register, forgot password, token exchange
│   │   ├── urls.py                 # /api/auth/... endpoints
│   │   └── tests.py                # Tests (e.g., provider exchange)
│   ├── manage.py                   # Django management
│   ├── requirements.txt            # Python deps
│   └── README.md                   # Backend docs
│
├── frontend/                       # Expo React Native app
│   ├── src/
│   │   ├── assets/                 # Images, icons, product images
│   │   ├── components/             # Reusable UI components
│   │   ├── config/                 # API endpoints, env reader
│   │   ├── navigation/             # Navigation setup
│   │   ├── screens/                # Screens (Login, Home, etc.)
│   │   ├── services/               # API wrappers (http, auth, products)
│   │   ├── store/                  # Redux slices and store
│   │   ├── utils/                  # Helpers (currency, etc.)
│   │   └── App.tsx                 # App root
│   ├── app.json                    # Expo app config
│   ├── babel.config.js             # Babel/NativeWind config
│   ├── tailwind.config.js          # Tailwind config
│   ├── postcss.config.js           # PostCSS config
│   ├── vercel.json                 # Static web deploy config
│   ├── scripts/optimize-images.mjs # Optional WebP generation
│   ├── package.json                # Scripts (vercel-build, build:web, etc.)
│   └── README.md                   # Frontend docs
│
├── README.md                       # Root docs
└── render.yaml                     # Example deploy config (if used)
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Expo CLI (or use `npx expo` for local CLI)
- Python 3.10+
- PostgreSQL

### Backend Setup (Django)

1. Navigate to the backend directory:

   ```sh
   cd backend
   ```

2. Create a virtual environment and activate it:

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

4. Configure your PostgreSQL database in `ecommerce/settings.py` (or set `DATABASE_URL`).

5. Run migrations and start the server:

   ```sh
   python manage.py migrate
   python manage.py runserver
   ```

### Frontend Setup (Expo React Native)

1. Navigate to the frontend directory:

   ```sh
   cd frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the Expo development server:

   ```sh
   npx expo start --clear
   ```

4. Scan the QR code with Expo Go (Android/iOS) or run on an emulator.

## Environment Variables

Frontend (`frontend/.env` or Vercel env):

- `API_URL` — Base URL to backend, e.g., `https://your-api.example.com`
- `EXPO_PUBLIC_FACEBOOK_APP_ID` — Facebook App ID for web
- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` — Google OAuth client ID for web
- `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID` — Google client ID for Android (optional for web)
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` — Google client ID for iOS (optional for web)

Backend (environment or `.env` loaded by your process manager):

- `DATABASE_URL` — PostgreSQL connection string
- `DJANGO_SECRET_KEY` — Django secret key
- `DEBUG` — `True`/`False`
- `ALLOWED_HOSTS` — e.g., your Render/Heroku hostnames and localhost
- `CORS_ALLOWED_ORIGINS` — include your Vercel domain(s) and local dev URL

## Customization & Branding

- Place your logo, icons, and images in `frontend/assets/`.
- Update color palette and fonts in `tailwind.config.js` and `nativewind.config.js`.
- Edit navigation and tab icons in `frontend/navigation/MainTabNavigator.tsx`.

## Scripts

- `npm start` / `npx expo start` — Start Expo dev server
- `npm run android` — Run on Android emulator/device
- `npm run ios` — Run on iOS simulator/device (macOS only)
- `npm run web` — Run in web browser

## Deploy to Vercel

Static web deploys are supported via Expo’s web export and a Vercel static build (`frontend/vercel.json`).

### One-time setup

- Ensure your backend API is reachable from the public internet and has CORS configured to allow your Vercel domain(s).
- In Google/Facebook developer consoles, include your Vercel domain in allowed origins / redirect URIs for social login.

### Vercel project settings

- Root Directory: `frontend`
- Build Command: `npm run vercel-build`
- Output Directory: `dist`
- Framework: Other (or leave auto) — `framework: null` is set in `vercel.json`.
     Note: Project Settings may be ignored because `builds` is defined in `vercel.json`.

### Environment variables (Vercel → Settings → Environment Variables)

Use UPPERCASE letters, digits, and underscores; names must not start with a digit.

- `API_URL` — Your Django API base URL (e.g., `https://your-api.example.com`)
- `EXPO_PUBLIC_FACEBOOK_APP_ID`
- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
- `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID` (optional for web)
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` (optional for web)

Expo injects these at build-time. Changing them requires a new deploy.

### What the build does

`npm run vercel-build` runs two steps:

1) `npm run optimize-images`
   - If `sharp` is available, creates `.webp` copies alongside `.png`/`.jpg` in:
     - `src/assets/product-images`
     - `src/assets/images`
     - `src/assets`
   - If `sharp` is not available, the step is skipped (build still succeeds).

2) `npm run build:web`
   - Runs `expo export --platform web --output-dir dist` to create a static site.

### Routing and caching

- SPA rewrites: URLs without a file extension rewrite to `index.html` (`/((?!.*\.).*)`).
- Caching (configured in `frontend/vercel.json`):
   - `index.html` — `Cache-Control: no-cache` (ensures users get the latest HTML).
   - Hashed/static assets (e.g., `/_expo/static/**`, `*.js|css|png|jpg|jpeg|webp|svg|ico`) — `Cache-Control: public, max-age=31536000, immutable`.
   - Other assets — `Cache-Control: public, max-age=600`.

### Local verification

- From `frontend/`:
   - `npm ci` (or `npm install`)
   - `npm run optimize-images`
   - `npm run build:web`
   - Optionally serve `dist/` locally with your favorite static server to smoke test.

### Troubleshooting deploys

- Missing `vercel-build` script → Add it to `frontend/package.json`.
- Export error: dynamic require() of assets → Replace with static requires (no computed paths).
- Blank page: SPA rewrite capturing assets → Use extension-excluding rewrite and correct headers.
- CORS errors calling the API → Add your Vercel domain(s) to Django CORS allow-list; ensure HTTPS.
- Social login errors → Provide `EXPO_PUBLIC_*` IDs; Facebook/Google apps must allow your Vercel domain.


## Troubleshooting

- If you see Metro/Babel errors, clear the cache:

  ```sh
  npx expo start --clear
  ```

- Ensure only one Babel config file exists (`babel.config.js`).
- For dependency issues, delete `node_modules` and reinstall:

  ```sh
  rm -rf node_modules
  npm install
  ```

- For backend issues, check your database connection and Django settings.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[ISAIAH KIMOBAN N-YILYAL](LICENSE)

---

> Built with ❤️ using Expo, Django, and modern best practices.
