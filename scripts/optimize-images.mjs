import sharp from 'sharp';
import { readdir, stat, access } from 'fs/promises';
import { join, extname } from 'path';

const PUBLIC_DIR = join(process.cwd(), 'public', 'images');
const EXTS = ['.png', '.jpg', '.jpeg'];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(full));
    } else {
      const ext = extname(entry.name).toLowerCase();
      if (EXTS.includes(ext)) files.push(full);
    }
  }
  return files;
}

async function fileExists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function convertToWebp(filePath) {
  const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  if (await fileExists(webpPath)) return false;
  try {
    await sharp(filePath)
      .webp({ quality: 82 })
      .toFile(webpPath);
    return true;
  } catch (err) {
    console.error(`  Failed: ${filePath} - ${err.message}`);
    return false;
  }
}

async function main() {
  console.log('Optimizing images...');
  const start = Date.now();
  const files = await walk(PUBLIC_DIR);
  console.log(`Found ${files.length} PNG/JPG files`);

  let created = 0;
  let skipped = 0;

  for (const file of files) {
    const ok = await convertToWebp(file);
    if (ok) created++;
    else skipped++;
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`Done in ${elapsed}s - ${created} WebP created, ${skipped} skipped`);
}

main().catch(err => { console.error(err); process.exit(1); });
