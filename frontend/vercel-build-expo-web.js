// Enhanced build script for Expo web deployment on Vercel
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Improved logging for better debugging
function log(message) {
  console.log(`[Expo Web Build] ${message}`);
}

try {
  log('Starting Expo Web build for Vercel deployment...');

  // Make sure node_modules exists
  if (!fs.existsSync('node_modules')) {
    log('Installing dependencies...');
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  }

  // Install required packages for Expo web
  log('Installing Expo web dependencies...');
  execSync('npm install @expo/webpack-config@^19.0.0 @babel/plugin-proposal-export-namespace-from @babel/plugin-syntax-dynamic-import --legacy-peer-deps', { stdio: 'inherit' });

  // Create an enhanced webpack.config.js for Expo web
  log('Creating enhanced webpack config for Expo web...');
  const webpackConfig = `
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['nativewind', 'moti', '@motify', 'react-native-reanimated']
    },
  }, argv);

  // Improve module resolution
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@screens': path.resolve(__dirname, 'src/screens'),
    '@store': path.resolve(__dirname, 'src/store'),
    '@navigation': path.resolve(__dirname, 'src/navigation'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@constants': path.resolve(__dirname, 'src/constants'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@assets': path.resolve(__dirname, 'src/assets')
  };
  
  return config;
};`;
  fs.writeFileSync('webpack.config.js', webpackConfig);

  // Ensure metro.config.js is compatible with web
  log('Checking metro.config.js compatibility...');
  if (fs.existsSync('metro.config.js')) {
    const metroConfig = `
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Find the project root directory
const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// Add support for importing from outside the src directory
config.watchFolders = [projectRoot];

// Configure resolver to handle web-specific extensions
config.resolver.sourceExts = [...config.resolver.sourceExts, 'web.js', 'web.jsx', 'web.ts', 'web.tsx'];

module.exports = config;`;
    fs.writeFileSync('metro.config.js', metroConfig);
  }

  // Run the Expo web build command
  log('Building Expo web application...');
  execSync('npx expo export:web', { stdio: 'inherit' });
  
  // The default export directory for expo export:web is 'web-build'
  // We need to move it to 'dist' for Vercel
  log('Setting up output for Vercel deployment...');
  
  // Create dist directory if it doesn't exist, or clear it if it does
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  
  // Check if web-build was created successfully
  if (fs.existsSync('web-build')) {
    // Rename web-build to dist for Vercel compatibility
    fs.renameSync('web-build', 'dist');
    log('Web build successfully moved to dist directory');
    
    // List files for verification
    const distFiles = fs.readdirSync('dist');
    log(`Files in dist directory: ${distFiles.join(', ')}`);
  } else {
    throw new Error('web-build directory not found after export');
  }
  
  log('Vercel build completed successfully');
} catch (error) {
  log(`Error during build: ${error.message}`);
  console.error(error);
  process.exit(1);
}