// Simple landing page script for Vercel deployment
const fs = require('fs');
const path = require('path');

console.log('Starting simple Vercel build...');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Create a simple landing page
console.log('Creating static landing page...');
const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>E-Commerce App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #333;
    }
    p {
      line-height: 1.6;
    }
    .container {
      background-color: #f9f9f9;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <h1>E-Commerce App</h1>
  
  <div class="container">
    <h2>Mobile Application</h2>
    <p>This is a placeholder for the E-Commerce mobile app. The app is designed for native mobile platforms using React Native and Expo.</p>
  </div>
  
  <div class="container">
    <h2>How to Try the App</h2>
    <ol>
      <li>Download Expo Go from your app store</li>
      <li>Scan the QR code from our GitHub repository</li>
      <li>Explore the full native experience</li>
    </ol>
  </div>
  
  <p>© 2025 Isaiah Kimoban</p>
</body>
</html>`;

fs.writeFileSync(path.join('dist', 'index.html'), htmlContent);
console.log('Landing page created successfully');

console.log('Vercel build completed successfully');