# EComShop Frontend — Slide Deck

A concise, presentation-ready overview of the Expo (React Native) frontend.

---

## 1. What is this?

- Expo React Native app (SDK 54) with web export
- TypeScript, Redux Toolkit, NativeWind/Tailwind, React Navigation
- Deployed to web as static site (Vercel) and to devices via Expo

---

## 2. Core Features

- Product catalog: infinite scroll, search, category filter, price sort
- Auth: Email/password + Google/Facebook (via AuthSession)
- Centralized HTTP with JWT attach, 401 handling
- Responsive UI with NativeWind + accessibility best practices
- Mock-data fallback for products when API is unavailable

---

## 3. Architecture at a Glance

- Views (screens) → Components (UI)
- Services (api/auth/products/http)
- Store (Redux slices: user/products/cart/wishlist/orders)
- Config (env/api constants)
- Utilities (formatters, helpers)

```text
src/
  assets/       # images, icons, product images
  components/   # Button, Input, ProductCard, ...
  config/       # api.ts, env.ts
  navigation/   # navigator setup
  screens/      # Login, Home, ProductList, ...
  services/     # http.ts, auth.ts, products.ts
  store/        # index.ts + slices
  utils/        # currency, misc utils
```

---

## 4. Environment Variables

- `API_URL` — Backend base URL (CORS must allow your domain)
- `EXPO_PUBLIC_FACEBOOK_APP_ID`
- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
- `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID` (mobile)
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` (mobile)

 Notes:
 
- Web build reads these at build time. Changing them requires a redeploy.
- The app won’t crash if API_URL is missing; it shows mock data for products.

---

## 5. Dev Commands

- Start dev server: `npx expo start`
- Android: `npm run android`  (emulator or Expo Go)
- iOS (macOS): `npm run ios`
- Web dev: `npm run web`
- Web export: `npm run build:web` → `dist/`
- Vercel build: `npm run vercel-build` (optimize images + export)

---

## 6. Deployment (Web / Vercel)

- `vercel.json` controls static build + headers
  - Build command: `npm run vercel-build`
  - Output dir: `dist`
  - SPA rewrites: only for URLs without a file extension `/((?!.*\.).*)`
  - Caching: `index.html` no-cache; static assets immutable
- `optimize-images` creates WebP copies if `sharp` is available (optional)

---

## 7. Notable Implementation Details

- Centralized fetch (`services/http.ts`) attaches JWT when calling `API_URL`
- 401 handler triggers global sign-out/banner path when needed
- Social auth guarded: UI disabled if IDs missing to avoid runtime errors
- Assets required statically (no dynamic `require`) for export compatibility

---

## 8. Accessibility and UX

- Buttons have `accessibilityRole` and labels; touch targets ≥ 44px
- Focus order, readable contrast, and non-color status indicators
- KeyboardAvoidingView and flexible layouts for smaller screens

---

## 9. Performance

- WebP assets (optional) + immutable caching for hashed files
- FlatList usage with windowing for large catalogs
- Avoid unnecessary re-renders via memoization in critical components

---

## 10. Troubleshooting

- Clear Metro cache: `npx expo start --clear`
- Blank page on web: check env vars, SPA rewrite, browser console
- Asset bundling errors on export: ensure static `require()` paths
- CORS/API errors: update backend CORS_ALLOWED_ORIGINS with Vercel domain

---

## 11. Roadmap (Nice-to-haves)

- Real token validation against Google/Facebook endpoints
- E2E tests for critical flows (login, browse, add-to-cart)
- Skeleton states for all major screens
- Deep linking and universal links setup

---

## 12. Credits

- Expo, React Native, Redux Toolkit, NativeWind, React Navigation
