const fs = require('fs');
const path = require('path');

// 1x1 transparent PNG
const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9YHkUpoAAAAASUVORK5CYII=';
const pngBuffer = Buffer.from(pngBase64, 'base64');

const targets = [
  path.join(__dirname, '..', 'src', 'assets', 'icon.png'),
  path.join(__dirname, '..', 'src', 'assets', 'splash.png'),
  path.join(__dirname, '..', 'src', 'assets', 'adaptive-icon.png'),
  path.join(__dirname, '..', 'src', 'assets', 'favicon.png'),
];

for (const file of targets) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, pngBuffer);
  console.log('Wrote', file, 'size', pngBuffer.length);
}
