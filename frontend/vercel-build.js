// Custom build script for Vercel deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting custom Vercel build for Expo...');

// Run the Expo export command
try {
  console.log('Running Expo export...');
  execSync('npx expo export', { stdio: 'inherit' });
  console.log('Expo export completed successfully');
} catch (error) {
  console.error('Error during Expo export:', error);
  process.exit(1);
}

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Copy the exported files to the dist directory
try {
  console.log('Copying files to dist directory...');
  execSync('cp -r dist/* ./dist/', { stdio: 'inherit' });
  console.log('Files copied successfully');
} catch (error) {
  console.error('Error copying files:', error);
  process.exit(1);
}

console.log('Vercel build completed successfully');