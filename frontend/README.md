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

## Project Structure

See the `src/` folder for all app code, organized by features and domain.

## Getting Started

1. Install dependencies: `npm install`
2. Start the app: `npm start` (or `npm run android` / `npm run ios` / `npm run web`)
3. Configure environment variables in `.env`

## Tech Stack

- React Native
- TypeScript
- Redux Toolkit
- NativeWind (Tailwind CSS)
- Expo

## Deployment

- Deploy static web build to Vercel/Netlify
- Use Expo for mobile deployment
