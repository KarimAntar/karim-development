import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const src = join(publicDir, 'logo_new.png');

async function generate() {
  const tasks = [
    // favicon-96x96.png
    { file: 'favicon-96x96.png', size: 96 },
    // apple-touch-icon.png (180x180)
    { file: 'apple-touch-icon.png', size: 180 },
    // PWA manifest icons
    { file: 'web-app-manifest-192x192.png', size: 192 },
    { file: 'web-app-manifest-512x512.png', size: 512 },
  ];

  for (const { file, size } of tasks) {
    const outPath = join(publicDir, file);
    await sharp(src)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(outPath);
    console.log(`✔ ${file} (${size}x${size})`);
  }

  // Generate favicon.ico as a 32x32 PNG-backed ICO
  // We create a 32x32 PNG buffer, then wrap it as a minimal single-image ICO
  const ico32Buffer = await sharp(src)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Also embed a 16x16 image in the ICO
  const ico16Buffer = await sharp(src)
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const icoBuffer = buildIco([ico16Buffer, ico32Buffer]);
  writeFileSync(join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('✔ favicon.ico (16x16 + 32x32)');

  // Generate favicon.svg — embed as a square SVG wrapping the PNG as a data URI
  const pngFor512 = readFileSync(join(publicDir, 'web-app-manifest-512x512.png'));
  const b64 = pngFor512.toString('base64');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <image href="data:image/png;base64,${b64}" width="512" height="512"/>
</svg>`;
  writeFileSync(join(publicDir, 'favicon.svg'), svg);
  console.log('✔ favicon.svg');

  console.log('\nAll favicons generated successfully.');
}

/**
 * Build a minimal ICO file from an array of PNG buffers.
 * The ICO format embeds each PNG directly (PNG-in-ICO, supported by all modern browsers).
 */
function buildIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const headerSize = 6; // ICONDIR
  const dirEntrySize = 16; // ICONDIRENTRY per image
  const dataOffset = headerSize + dirEntrySize * numImages;

  const totalSize = dataOffset + pngBuffers.reduce((acc, b) => acc + b.length, 0);
  const buf = Buffer.alloc(totalSize);

  // ICONDIR header
  buf.writeUInt16LE(0, 0);       // reserved
  buf.writeUInt16LE(1, 2);       // type: 1 = ICO
  buf.writeUInt16LE(numImages, 4);

  let imageOffset = dataOffset;
  for (let i = 0; i < numImages; i++) {
    const png = pngBuffers[i];
    // Read width/height from PNG IHDR (bytes 16–23)
    const w = png.readUInt32BE(16);
    const h = png.readUInt32BE(20);

    const entryOffset = headerSize + i * dirEntrySize;
    buf.writeUInt8(w >= 256 ? 0 : w, entryOffset);      // width (0 = 256)
    buf.writeUInt8(h >= 256 ? 0 : h, entryOffset + 1);  // height (0 = 256)
    buf.writeUInt8(0, entryOffset + 2);    // color count
    buf.writeUInt8(0, entryOffset + 3);    // reserved
    buf.writeUInt16LE(1, entryOffset + 4); // color planes
    buf.writeUInt16LE(32, entryOffset + 6); // bits per pixel
    buf.writeUInt32LE(png.length, entryOffset + 8);    // size of image data
    buf.writeUInt32LE(imageOffset, entryOffset + 12);  // offset of image data

    png.copy(buf, imageOffset);
    imageOffset += png.length;
  }

  return buf;
}

generate().catch(err => { console.error(err); process.exit(1); });
