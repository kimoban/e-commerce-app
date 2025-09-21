const path = require('path');
const fs = require('fs');
const Jimp = require('jimp-compact');

const outDir = path.join(__dirname, '..', 'src', 'assets');
fs.mkdirSync(outDir, { recursive: true });

(async () => {
  try {
    const variants = [
      { name: 'icon.png', size: 256, color: 0x2563EBFF }, // blue
      { name: 'splash.png', size: 512, color: 0xFFFFFFFF }, // white
      { name: 'adaptive-icon.png', size: 432, color: 0x111827FF }, // gray-900
      { name: 'favicon.png', size: 64, color: 0x2563EBFF }, // blue
    ];

    for (const v of variants) {
      const img = await new Jimp(v.size, v.size, v.color);
      // simple centered dot for visibility
      const dotSize = Math.max(8, Math.floor(v.size / 16));
      img.scan((img.bitmap.width - dotSize) / 2, (img.bitmap.height - dotSize) / 2, dotSize, dotSize, function(x, y, idx){
        this.bitmap.data[idx + 0] = 255; // R
        this.bitmap.data[idx + 1] = 255; // G
        this.bitmap.data[idx + 2] = 255; // B
        this.bitmap.data[idx + 3] = 255; // A
      });
      const outPath = path.join(outDir, v.name);
      await img.writeAsync(outPath);
      const { size } = fs.statSync(outPath);
      console.log('Wrote', outPath, 'size', size);
    }
  } catch (e) {
    console.error('Error generating assets:', e);
    process.exit(1);
  }
})();
