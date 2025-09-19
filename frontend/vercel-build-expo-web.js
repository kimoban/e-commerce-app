// Build script for Expo web deployment on Vercel
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting Expo Web build for Vercel deployment...');

try {
  // Install the required webpack config package for Expo web
  console.log('Installing necessary dependencies...');
  execSync('npm install @expo/webpack-config@^19.0.0 --legacy-peer-deps', { stdio: 'inherit' });

  // Create webpack.config.js for Expo web
  console.log('Creating webpack config for Expo web...');
  const webpackConfig = `
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['nativewind']
    }
  }, argv);
  
  // Customize the config for better compatibility
  // with Vercel and for web-specific optimizations
  return config;
};
`;
  fs.writeFileSync('webpack.config.js', webpackConfig);

  // Run the Expo web build command
  console.log('Building Expo web application...');
  execSync('npx expo export:web', { stdio: 'inherit' });
  
  // The default export directory for expo export:web is 'web-build'
  // We need to move it to 'dist' for Vercel
  console.log('Moving web-build files to dist directory...');
  
  // Create dist directory if it doesn't exist
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
  }
  
  // Rename web-build to dist
  fs.renameSync('web-build', 'dist');
  
  console.log('Web build successfully moved to dist directory');
  console.log('Vercel build completed successfully');
} catch (error) {
  console.error('Error during build:', error);
  process.exit(1);
}