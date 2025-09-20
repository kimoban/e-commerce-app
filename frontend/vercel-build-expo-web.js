
// Simple build script for Expo web deployment on Vercel
const fs = require('fs');
const { execSync } = require('child_process');

try {
  // Run Expo web export
  execSync('npx expo export:web', { stdio: 'inherit' });

  // Remove old dist if exists
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }

  // Move web-build to dist
  if (fs.existsSync('web-build')) {
    fs.renameSync('web-build', 'dist');
    console.log('Expo web build successfully moved to dist directory');
  } else {
    throw new Error('web-build directory not found after export');
  }

  console.log('Vercel build completed successfully');
} catch (error) {
  console.error('Error during build:', error);
  process.exit(1);
}