# EComShop Frontend (Expo SDK 54)

Frontend app for the E-Commerce project, built with Expo (React Native + Web), TypeScript, Redux Toolkit, NativeWind/Tailwind, and React Navigation. Web is exported as a static site and deployed to Vercel.

## Features

- Product catalog with infinite scroll, search, category filter, and sort
- Email/password login; Google/Facebook OAuth via Expo AuthSession
- Centralized HTTP with JWT attach and 401 handling
- Responsive UI with NativeWind; accessibility-friendly components
- Mock-data fallback when `API_URL` isn’t configured (web remains usable)

## Tech Stack

- Node.js 18+ (dev), Expo SDK 54
- React Native 0.81.x, React 19, TypeScript
- Redux Toolkit, React Redux
- NativeWind/TailwindCSS
- React Navigation (stack/bottom-tabs)
- Expo AuthSession, WebBrowser, StatusBar, LinearGradient

## Project Structure

```bash
frontend/
├── app.json
├── App.tsx
├── babel.config.js
├── metro.config.js
├── nativewind-env.d.ts
├── package.json
├── postcss.config.js
├── scripts/
│   └── optimize-images.mjs
├── src/
│   ├── App.tsx
│   ├── assets/
│   │   ├── icons/
│   │   ├── images/
│   │   └── product-images/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── ProductCard.tsx
│   │   └── ...
│   ├── config/
│   │   ├── api.ts
│   │   └── env.ts
│   ├── navigation/
│   ├── screens/
│   │   └── LoginScreen.tsx
│   ├── services/
│   │   ├── auth.ts
│   │   ├── http.ts
│   │   └── products.ts
│   ├── store/
│   │   ├── index.ts
│   │   ├── productsSlice.ts
│   │   ├── userSlice.ts
│   │   └── ...
│   └── utils/
│       └── currency.ts
├── tailwind.config.js
├── tsconfig.json
└── vercel.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm (or Yarn/PNPM)
- Expo CLI (bundled via `npx expo`)
- Android Studio + emulator, or Expo Go on a physical device
- Optional: Xcode + iOS Simulator (macOS only)

### Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Configure environment variables (see “Environment Variables”). For local dev, you can create a `.env` or use your shell environment.

3. Start the dev server:

   ```sh
   npx expo start
   ```

4. Run on targets:

   - Android emulator or device: `npm run android`
   - iOS simulator (macOS): `npm run ios`
   - Web: `npm run web`

5. Export for web (static):

   ```sh
   npm run build:web
   # Output in dist/
   ```

## Environment Variables

Set via your `.env`, OS environment, or Vercel env settings:

- `API_URL` — Backend base URL
- `EXPO_PUBLIC_FACEBOOK_APP_ID`
- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
- `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID` (mobile)
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` (mobile)

Notes:

- Web builds read these at build time; redeploy when changing them
- If `API_URL` is missing, the app shows mock product data and stays usable

## Deployment (Web / Vercel)

- `vercel.json` controls build (`npm run vercel-build`), output (`dist`), and SPA rewrites
- SPA rewrites only for URLs without a file extension: `/((?!.*\.).*)`
- Caching: `index.html` no-cache; static assets immutable
- `optimize-images` generates WebP if `sharp` is installed (optional)

## Scripts

- Start dev server: `npx expo start`
- Android: `npm run android`
- iOS (macOS): `npm run ios`
- Web dev: `npm run web`
- Web export: `npm run build:web` → `dist/`
- Vercel build: `npm run vercel-build` (optimize images + export)
- Typecheck: `npm run typecheck`

## Troubleshooting

- Clear Metro cache: `npx expo start --clear`
- Blank page on web: check env vars, SPA rewrite, and browser console
- Asset bundling errors: use static `require()` paths (no dynamic requires)
- CORS/API errors: ensure backend `CORS_ALLOWED_ORIGINS` includes your Vercel domain

## Testing

- Type checking (TS):

  ```sh
  npm run typecheck
  ```

> Note: Frontend unit/e2e tests are not yet set up. Consider adding Jest/React Testing Library and Detox/Playwright for critical flows.

## License

[ISAIAH KIMOBAN N-YILYAL](../LICENSE)

---
> This frontend delivers a polished cross-platform experience and pairs with the Django backend for a complete E-Commerce stack.
