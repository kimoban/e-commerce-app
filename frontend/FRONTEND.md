# EComShop Frontend Slide Deck

---

## Project Overview

- Expo React Native app (SDK 54) with TypeScript and web export
- UI: NativeWind/Tailwind + React Navigation
- State: Redux Toolkit with typed selectors and slices
- Auth: Email/password plus Google/Facebook via Expo AuthSession
- Deployment: Static web via Vercel (expo export → dist/); mobile via Expo

---

## Architecture

- Screens & Components: Login, Home, ProductList, ProductDetails, etc.
- Redux Store: productsSlice, userSlice (cart/wishlist/orders planned)
- Services: http (JWT attach, 401 handling), products, auth, config/api
- Static Assets: required with static paths for web export compatibility
- Build: expo export → dist/ with SPA rewrites and caching headers (vercel.json)

Diagram: See `frontend/docs/architecture.svg` (also linked in frontend README).

---

## Key Technologies & Definitions

- Expo SDK 54 / React Native 0.81.x / React 19 / TypeScript
- Redux Toolkit & React Redux for predictable state management
- NativeWind/Tailwind for styling
- React Navigation for navigation stacks and tabs
- Expo AuthSession and WebBrowser for OAuth flows
- Sharp (optional) for WebP image optimization in web builds

---

## API Endpoints (Client Usage)

- Products: `GET /api/products` with `page`, `limit`, `q`, `category`, `sort`
- Categories: `GET /api/categories`
- Auth: `POST /api/auth/token` (username/password), `POST /api/auth/token/refresh`
- Provider exchange: `POST /api/auth/google/exchange`, `POST /api/auth/facebook/exchange`

Note: Frontend centralizes requests through `services/http.ts` and only attaches JWT for calls to the configured API origin.

---

## Asynchronous Tasks & Scheduling (Frontend Perspective)

- Uses async thunks/promises to fetch data without blocking UI
- Background tasks (push notifications, periodic sync) can be added via Expo APIs (future)

---

## Security Features & Definitions

- JWT handling: Access token attached only for API origin requests
- Secure redirects: OAuth flows via AuthSession; UI disabled if IDs missing
- CORS-awareness: Frontend expects backend CORS to include Vercel domain(s)
- Input validation: Basic client-side checks; server remains source of truth

---

## Error Monitoring & Logging

- Console and global error boundaries (add Sentry for production parity)
- Graceful fallbacks: mock product data if API misconfigured

---

## Testing & Quality Assurance

- Type checking via `npm run typecheck`
- Jest scaffold for unit tests (see `frontend/jest.config.js` and `src/utils/__tests__/`)
- Suggested e2e: Detox (native) or Playwright (web) for critical flows

---

## Deployment & Operations

- Web (Vercel):
  - Build: `npm run vercel-build` → `dist/`
  - SPA rewrites for non-file URLs only: `/((?!.*\.).*)`
  - Caching: `index.html` no-cache; static assets immutable
  - Optional `optimize-images` if `sharp` is installed
- Mobile: Run in Expo Go or build EAS (future)

---

## Advanced Features

- Performance: FlatList windowing, memoized components, optional WebP
- Accessibility: roles, labels, color contrast, inclusive focus order
- Deep linking (future), universal links (future)

---

## Directory Structure Explained

```text
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
│   ├── config/
│   │   ├── api.ts
│   │   └── env.ts
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   │   ├── auth.ts
│   │   ├── http.ts
│   │   └── products.ts
│   ├── store/
│   │   ├── index.ts
│   │   ├── productsSlice.ts
│   │   └── userSlice.ts
│   └── utils/
│       └── currency.ts
├── tailwind.config.js
├── tsconfig.json
└── vercel.json
```

---

## Summary

- Cross-platform frontend: fast, accessible, and production-ready
- Resilient to misconfiguration with safe fallbacks for web
- Integrates cleanly with the Django backend via a typed, centralized API layer

---

## Q&A

- Questions about the frontend implementation?
