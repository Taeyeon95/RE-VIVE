const sharp = require('sharp');
const path = require('path');

const SRC = path.join(__dirname, '..', 'public', 'logo.png');
const OUT_DIR = path.join(__dirname, '..', 'public');

// Bounding box of the icon glyph (excludes the "REVIVE" wordmark below it),
// found by scanning per-row/column pixel brightness for the gap before the text.
const CROP = { left: 421, top: 0, width: 750, height: 750 };
// Matches manifest.json's background_color — the glyph is dark green and
// needs a light backdrop to stay visible once the source alpha is flattened.
const BG = { r: 250, g: 250, b: 244, alpha: 1 };

async function main() {
  const iconSquare = sharp(SRC).extract(CROP).flatten({ background: BG });

  await iconSquare
    .clone()
    .resize(192, 192, { fit: 'contain', background: BG })
    .png()
    .toFile(path.join(OUT_DIR, 'pwa-192x192.png'));

  await iconSquare
    .clone()
    .resize(512, 512, { fit: 'contain', background: BG })
    .png()
    .toFile(path.join(OUT_DIR, 'pwa-512x512.png'));

  // Maskable icons need a ~40% safe-zone margin so OS masks don't clip the glyph.
  await iconSquare
    .clone()
    .resize(300, 300, { fit: 'contain', background: BG })
    .extend({ top: 106, bottom: 106, left: 106, right: 106, background: BG })
    .png()
    .toFile(path.join(OUT_DIR, 'maskable-icon-512x512.png'));

  await iconSquare
    .clone()
    .resize(180, 180, { fit: 'contain', background: BG })
    .png()
    .toFile(path.join(OUT_DIR, 'apple-touch-icon.png'));

  await iconSquare
    .clone()
    .resize(32, 32, { fit: 'contain', background: BG })
    .png()
    .toFile(path.join(OUT_DIR, 'favicon-32x32.png'));

  console.log('icons generated');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
