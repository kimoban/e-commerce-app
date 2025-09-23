# E-Commerce Mobile App

A modern, full-stack e-commerce mobile application built with Django REST framework and Expo React Native (frontend). This project follows best practices for scalability, maintainability, and developer experience.

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

- **RESTful API**: Django REST Framework for all product, cart, and user endpoints
- **Authentication**: JWT-based authentication for secure login and registration
- **Product Management**: CRUD operations for products and categories
- **User Management**: Registration, login, and profile endpoints
- **Database**: PostgreSQL for robust, scalable data storage

### Frontend Features

- **Product Catalog**: Infinite scroll, filtering by category, and sorting by price
- **Product Details**: Detailed product view with images and descriptions
- **Cart**: Add, remove, and update quantities; persistent cart state
- **Authentication**: Login, registration, and profile management (JWT-based)
- **Navigation**: Modern tab and stack navigation with icons
- **State Management**: Redux Toolkit for cart and auth state
- **Styling**: NativeWind (Tailwind CSS for React Native) for a modern, accessible UI
- **Image Assets**: Support for custom branding, logos, and product images

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
├── backend/                # Django backend (API, models, auth, etc.)
├── frontend/               # Expo React Native app
│   ├── assets/             # Images, icons, branding
│   ├── components/         # Reusable UI components
│   ├── navigation/         # Navigation setup
│   ├── screens/            # App screens (Home, ProductList, Cart, etc.)
│   ├── store/              # Redux slices and store
│   ├── App.tsx             # App entry point
│   ├── index.ts            # Expo entry point
│   ├── babel.config.js     # Babel config for Expo/NativeWind
│   ├── tailwind.config.js  # Tailwind CSS config
│   ├── nativewind.config.js# NativeWind config
│   └── ...
└── README.md
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

4. Configure your PostgreSQL database in `settings.py`.

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

- Configure API endpoints and secrets in environment files as needed (e.g., `.env` for Django, or use `app.json` for Expo).

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

Static web deploys are supported via Expo’s web export and a Vercel static build.

### One-time setup

- Ensure your backend API is reachable from the public internet and has CORS configured to allow your Vercel domain(s).
- In Google/Facebook developer consoles, include your Vercel domain in allowed origins / redirect URIs for social login.

### Vercel project settings

This repository contains `frontend/vercel.json` and scripts tailored for static export.

- Root Directory: `frontend`
- Build Command: `npm run vercel-build`
- Output Directory: `dist`
- Framework: Other (or leave auto) — `vercel.json` sets `framework: null`.

Notes:

- If Vercel warns that Project Settings are ignored, that’s expected — `builds` in `vercel.json` take precedence.

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
    - Creates lossy `.webp` copies alongside `.png`/`.jpg` in:
       - `src/assets/product-images`
       - `src/assets/images`
       - `src/assets`
    - Safe to re-run. Skips files that already have `.webp`.

2) `npm run build:web`
    - Runs `expo export --platform web --output-dir dist` to create a static site.

### Routing and caching

- SPA rewrites: All routes rewrite to `index.html`.
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

- Missing script: `Missing required "vercel-build" script` → ensure `package.json` has `"vercel-build"`.
- Dynamic require of assets fails on export → Use static `require('path/to/file.ext')` entries; dynamic paths cannot be statically analyzed.
- 404s on deep links → Verify SPA rewrites to `index.html` are present.
- CORS errors calling the API → Add your Vercel domain(s) to Django CORS allow-list; ensure HTTPS.
- Social login errors → Add Vercel domain to Google/Facebook app configs; verify redirect URIs.


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
