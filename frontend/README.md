# EComShop Frontend (Expo SDK 54)

React Native app (web + mobile) using Expo, TypeScript, Redux Toolkit, NativeWind/Tailwind, and React Navigation. Web export is deployed as a static site.

## Commands

- Start dev server: `npx expo start`
- Android: `npm run android`
- iOS (macOS): `npm run ios`
- Web dev: `npm run web`
- Web export: `npm run build:web` → outputs `dist/`
- Vercel build: `npm run vercel-build` (runs image optimize + export)

## Environment

Configure `frontend/.env` (or Vercel env):

- `API_URL` — Backend base URL
- `EXPO_PUBLIC_FACEBOOK_APP_ID`
- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
- `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID` (mobile)
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` (mobile)

Note: The app will still render if `API_URL` is missing; it falls back to mock data for product lists.

## Web deployment (Vercel)

Vercel config is in `vercel.json`:

- Build Command: `npm run vercel-build`
- Output Directory: `dist`
- SPA rewrites only for routes without a file extension: `/((?!.*\.).*)`
- Caching headers: `index.html` no-cache; static assets immutable

The `optimize-images` script is optional; if `sharp` is unavailable, it skips generation.

## Android quickstart

1) Install Expo Go on your device or start an Android emulator.
2) Run `npx expo start` and press `a` for emulator, or scan the QR with Expo Go.
3) Ensure the device and PC are on the same network.

## Notes

- NativeWind/Tailwind is configured in `babel.config.js` and PostCSS.
- Module aliases are set (e.g., `@components`, `@screens`, `@store`, `@config`, `@services`).
- Facebook/Google auth use Expo AuthSession; missing web client IDs keep UI disabled instead of crashing.

## Accessibility

- Buttons use `accessibilityRole="button"` and labels; touch targets are >= 44px.
- Selected state uses `accessibilityState` where appropriate.

## Currency formatting (GH₵)

- `src/utils/currency.ts` exports `formatCurrency(value: number)`
- Uses `Intl.NumberFormat('en-GH', { currency: 'GHS' })` with a safe fallback

## Troubleshooting

- Clear Metro cache: `npx expo start --clear`
- Asset require errors on web export → replace dynamic requires with static `require()` entries
- Blank page on web → ensure env vars set, SPA rewrite excludes asset requests, and check browser console
