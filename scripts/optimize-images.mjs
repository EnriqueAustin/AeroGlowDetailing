import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.resolve('src/assets/images');
const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f) && f !== 'mainLogo.png');

let totalBefore = 0;
let totalAfter = 0;
const rows = [];

for (const file of files) {
  const src = path.join(dir, file);
  const out = path.join(dir, file.replace(/\.(jpe?g|png)$/i, '.webp'));
  await sharp(src)
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(out);
  const before = fs.statSync(src).size;
  const after = fs.statSync(out).size;
  totalBefore += before;
  totalAfter += after;
  rows.push({
    file,
    before: `${(before / 1024).toFixed(0)} KB`,
    after: `${(after / 1024).toFixed(0)} KB`,
    saved: `${(((before - after) / before) * 100).toFixed(1)}%`,
  });
}

console.table(rows);
console.log(`Total saved: ${((totalBefore - totalAfter) / 1024).toFixed(0)} KB (${(totalBefore / 1024).toFixed(0)} KB -> ${(totalAfter / 1024).toFixed(0)} KB)`);
