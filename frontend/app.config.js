// app.config.js - Expo configuration file
const config = {
  name: "E-Com Shop",
  slug: "e-com-shop",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff"
  },
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false
  },
  web: {
    favicon: "./assets/favicon.png",
    bundler: "webpack",
    output: "static",
    // Adding these options for better web compatibility
    babel: {
      dangerouslyAddModulePathsToTranspile: ['nativewind']
    }
  },
  // This helps with module resolution
  plugins: [
    ['babel-plugin-module-resolver',
      {
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@store': './src/store',
          '@navigation': './src/navigation',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@hooks': './src/hooks',
          '@assets': './src/assets'
        }
      }
    ],
    'nativewind/babel'
  ]
};

// Detect environment and adjust configuration
if (process.env.VERCEL_ENV) {
  console.log('Building for Vercel environment');
  // Vercel-specific configurations
  config.web.output = 'static';
}

module.exports = { expo: config };