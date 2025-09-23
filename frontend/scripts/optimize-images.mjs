#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
let sharp;
try {
  // Optional dependency; skip if not installed or fails to load
  sharp = (await import('sharp')).default;
} catch (err) {
  console.warn('optimize-images: sharp not available, skipping WebP generation');
  process.exit(0);
}

// Optimize images across asset folders by creating .webp copies (lossy) for web builds
const projectRoot = process.cwd();
const targetDirs = [
  path.join(projectRoot, 'src', 'assets', 'product-images'),
  path.join(projectRoot, 'src', 'assets', 'images'),
  path.join(projectRoot, 'src', 'assets'),
];

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
  let total = 0;
  for (const dir of targetDirs) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const e of entries) {
        if (!e.isFile()) continue;
        const ext = path.extname(e.name).toLowerCase();
        if (!exts.has(ext)) continue;
        const srcPath = path.join(dir, e.name);
        const base = e.name.slice(0, -ext.length);
        const outPath = path.join(dir, `${base}.webp`);
        if (await fileExists(outPath)) continue; // skip if already exists
        await createWebp(srcPath, outPath);
        total++;
      }
    } catch (err) {
      // Non-fatal: directory may not exist in all projects
    }
  }
  console.log(`optimize-images: created ${total} webp files`);
}

run();
