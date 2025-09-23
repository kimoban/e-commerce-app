#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Optimize images in src/assets/product-images for web export by creating .webp copies
const projectRoot = process.cwd();
const imagesDir = path.join(projectRoot, 'src', 'assets', 'product-images');

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

async function createWebp(inputPath, outPath) {
  const buffer = await fs.readFile(inputPath);
  // Convert to WebP with lossy quality 70; adjust if needed
  const webp = await sharp(buffer).webp({ quality: 70 }).toBuffer();
  await fs.writeFile(outPath, webp);
}

async function run() {
  const exts = new Set(['.png', '.jpg', '.jpeg']);
  let count = 0;
  try {
    const entries = await fs.readdir(imagesDir, { withFileTypes: true });
    for (const e of entries) {
      if (!e.isFile()) continue;
      const ext = path.extname(e.name).toLowerCase();
      if (!exts.has(ext)) continue;
      const srcPath = path.join(imagesDir, e.name);
      const base = e.name.slice(0, -ext.length);
      const outPath = path.join(imagesDir, `${base}.webp`);
      if (await fileExists(outPath)) continue; // skip if already exists
      await createWebp(srcPath, outPath);
      count++;
    }
    console.log(`optimize-images: created ${count} webp files`);
  } catch (err) {
    console.warn('optimize-images: skipped (dir missing or other non-fatal issue):', err?.message || err);
  }
}

run();
