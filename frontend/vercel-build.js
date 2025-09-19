// Source code showcase script for Vercel deployment
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('Starting E-Commerce source code showcase build...');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Function to recursively get all files in directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfFiles;
}

// Function to determine language for syntax highlighting
function getLanguage(filename) {
  const ext = path.extname(filename).toLowerCase();
  switch(ext) {
    case '.js': return 'javascript';
    case '.jsx': return 'javascript';
    case '.ts': return 'typescript';
    case '.tsx': return 'typescript';
    case '.css': return 'css';
    case '.html': return 'html';
    case '.json': return 'json';
    case '.md': return 'markdown';
    default: return 'plaintext';
  }
}

try {
  console.log('Creating source code showcase...');
  
  // Get all source files
  const srcPath = path.join(__dirname, 'src');
  const sourceFiles = getAllFiles(srcPath);
  
  // Create file content map
  const fileContents = {};
  sourceFiles.forEach(file => {
    const relativePath = file.replace(__dirname + path.sep, '');
    
    // Skip node_modules and large files
    if (relativePath.includes('node_modules') || 
        fs.statSync(file).size > 1000000) {
      return;
    }
    
    try {
      fileContents[relativePath] = fs.readFileSync(file, 'utf8');
    } catch (err) {
      console.log(`Error reading ${relativePath}: ${err.message}`);
      fileContents[relativePath] = `/* Error reading file: ${err.message} */`;
    }
  });
  
  // Generate HTML showcase
  const fileLinks = Object.keys(fileContents)
    .filter(file => file.startsWith('src/'))
    .map(file => `<li><a href="#${encodeURIComponent(file)}" class="file-link">${file}</a></li>`)
    .join('\n');
  
  const fileViews = Object.keys(fileContents)
    .filter(file => file.startsWith('src/'))
    .map(file => {
      const language = getLanguage(file);
      const content = fileContents[file]
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
      
      return `
        <div id="${encodeURIComponent(file)}" class="file-container">
          <h3 class="file-path">${file}</h3>
          <pre class="code-block"><code class="language-${language}">${content}</code></pre>
        </div>
      `;
    })
    .join('\n');
  
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>E-Commerce App Source Code</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
  <script>hljs.highlightAll();</script>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      margin: 0;
      padding: 0;
      color: #333;
      background-color: #f5f5f5;
    }
    .container {
      display: flex;
      height: 100vh;
    }
    .sidebar {
      width: 300px;
      background-color: #2d333b;
      color: #fff;
      padding: 20px;
      overflow-y: auto;
      flex-shrink: 0;
    }
    .main-content {
      flex-grow: 1;
      padding: 20px;
      overflow-y: auto;
    }
    h1 {
      margin-top: 0;
      padding-bottom: 10px;
      border-bottom: 1px solid #444;
    }
    .file-list {
      list-style-type: none;
      padding: 0;
    }
    .file-link {
      display: block;
      padding: 5px 0;
      color: #58a6ff;
      text-decoration: none;
      font-size: 14px;
    }
    .file-link:hover {
      text-decoration: underline;
    }
    .file-container {
      margin-bottom: 30px;
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .file-path {
      margin: 0;
      padding: 10px 15px;
      background-color: #24292e;
      color: white;
      font-size: 16px;
      font-weight: 500;
    }
    .code-block {
      margin: 0;
      padding: 15px;
      overflow-x: auto;
      font-size: 14px;
      line-height: 1.5;
      background-color: #282c34;
    }
    @media (max-width: 768px) {
      .container {
        flex-direction: column;
      }
      .sidebar {
        width: auto;
        max-height: 200px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="sidebar">
      <h1>Source Files</h1>
      <ul class="file-list">
        ${fileLinks}
      </ul>
    </div>
    <div class="main-content">
      <h1>E-Commerce App Source Code</h1>
      <p>This is a showcase of the source code for the E-Commerce mobile app. The app is built with React Native and Expo.</p>
      ${fileViews}
      <p>© 2025 Isaiah Kimoban</p>
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join('dist', 'index.html'), htmlContent);
  console.log('Source code showcase created successfully');
  
  console.log('Vercel build completed successfully');
} catch (error) {
  console.error('Error during build:', error);
  process.exit(1);
}