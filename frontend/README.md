# EComShop (Expo SDK 54)

Web export and deploy

- Build static web assets:
  - npm run build:web
  - Output: dist/

- Deploy to Vercel/Netlify:
  - Set the output/public directory to dist
  - No build command if you pre-export locally; otherwise use the same build:web command on CI

Notes

- NativeWind + Tailwind are configured via babel preset and postcss.
- Module aliases are available (@components, @screens, @store, etc.).

## E-Commerce Frontend

This is a React Native app built with TypeScript, Redux Toolkit, and NativeWind (Tailwind CSS for React Native).

## Features

- Product catalog with API integration
- Filtering (category, multi-criteria), sorting (price)
- Pagination & infinite scrolling
- Responsive, accessible UI
- Authentication, cart, checkout, profile, and order history
- Localized currency display (GH₵) with a shared formatter util

## Project Structure

See the `src/` folder for all app code, organized by features and domain.

## Getting Started

1. Install dependencies: `npm install`
2. Start the app: `npm start` (or `npm run android` / `npm run ios` / `npm run web`)
3. Configure environment variables in `.env`

### Currency formatting (GH₵)

All price displays use a shared formatter:

- `src/utils/currency.ts` exports `formatCurrency(value: number)`
- Backed by `Intl.NumberFormat('en-GH', { currency: 'GHS' })` with a fallback for environments without Intl
- Example: `formatCurrency(1234.5) // => GH₵1,234.50`

### Accessibility conventions

- Buttons and tappable cards have `accessibilityRole="button"`, `accessibilityLabel`, and minimum touch target size (>= 44px height)
- Filter chips (category bar) expose selected state via `accessibilityState={{ selected: true }}`
- Prefer semantic text via headings and labels; avoid color as the only indicator

## Tech Stack

- React Native
- TypeScript
- Redux Toolkit
- NativeWind (Tailwind CSS)
- Expo

## Deployment

- Deploy static web build to Vercel/Netlify
  - Vercel configuration is in `vercel.json` (output directory: `dist`)
  - CI workflow `.github/workflows/frontend-ci.yml` builds and uploads the web artifact on every push/PR
- Use Expo for mobile deployment
