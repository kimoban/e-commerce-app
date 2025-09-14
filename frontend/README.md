# E-Commerce Frontend (Expo React Native)

This is the frontend mobile app for the E-Commerce project, built with Expo React Native, TypeScript, Redux Toolkit, and NativeWind (Tailwind CSS for React Native). It provides a modern, fast, and user-friendly shopping experience.

## Features

- **Product Catalog**: Infinite scroll, filtering by category, and sorting by price
- **Product Details**: View images, descriptions, and details for each product
- **Cart**: Add, remove, and update quantities; persistent cart state
- **Authentication**: Login, registration, and profile management (JWT-based)
- **Navigation**: Modern tab and stack navigation with icons
- **State Management**: Redux Toolkit for cart and auth state
- **Styling**: NativeWind (Tailwind CSS for React Native) for a modern, accessible UI
- **Image Assets**: Support for custom branding, logos, and product images

## Tech Stack

- Expo React Native
- TypeScript
- Redux Toolkit
- NativeWind (Tailwind CSS for React Native)
- React Navigation

## Project Structure

```bash
frontend/
├── assets/             # Images, icons, branding
├── components/         # Reusable UI components
├── navigation/         # Navigation setup
├── screens/            # App screens (Home, ProductList, Cart, etc.)
├── store/              # Redux slices and store
├── App.tsx             # App entry point
├── index.ts            # Expo entry point
├── babel.config.js     # Babel config for Expo/NativeWind
├── tailwind.config.js  # Tailwind CSS config
├── nativewind.config.js# NativeWind config
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Expo CLI (or use `npx expo` for local CLI)

### Setup

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

- Configure API endpoints and secrets in `app.json` or with environment variables as needed.

## Customization & Branding

- Place your logo, icons, and images in `assets/`.
- Update color palette and fonts in `tailwind.config.js` and `nativewind.config.js`.
- Edit navigation and tab icons in `navigation/MainTabNavigator.tsx`.

## Scripts

- `npm start` / `npx expo start` — Start Expo dev server
- `npm run android` — Run on Android emulator/device
- `npm run ios` — Run on iOS simulator/device (macOS only)
- `npm run web` — Run in web browser

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

## License

[ISAIAH KIMOBAN N-YILYAL](../LICENSE)

---
> This frontend delivers a seamless, modern shopping experience for the E-Commerce Mobile App.
