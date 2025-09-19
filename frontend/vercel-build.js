// Custom build script for Vercel deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting custom Vercel build for Expo...');

// Create a temporary babel.config.js file for Vercel
console.log('Creating Vercel-compatible Babel config...');
const originalBabelConfig = fs.readFileSync('babel.config.js', 'utf8');
fs.writeFileSync('babel.config.js', `
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['nativewind/babel']
};
`, 'utf8');

// Create a simple webpack.config.js for web builds
console.log('Creating webpack config for web...');
fs.writeFileSync('webpack.config.js', `
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyAddModulePathsToTranspile: ['nativewind']
      }
    },
    argv
  );
  return config;
};
`, 'utf8');

try {
  // Use expo export:web instead of just export
  console.log('Running Expo export web...');
  execSync('npx expo export:web', { stdio: 'inherit' });
  console.log('Expo web export completed successfully');

  // Create dist directory if it doesn't exist
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }

  // Copy the web-build to dist
  console.log('Copying web-build to dist directory...');
  fs.cpSync('web-build', 'dist', { recursive: true });
  console.log('Files copied successfully');
  
  console.log('Vercel build completed successfully');
} catch (error) {
  console.error('Error during build:', error);
  process.exit(1);
}