const sharp = require('sharp');
const path = require('path');

const SRC = path.join(__dirname, '..', 'public', 'auth-logo.jpeg');
const OUT = path.join(__dirname, '..', 'public', 'auth-logo.png');

// The source background is a near-uniform off-white; key it out to alpha
// with a soft threshold band so edges anti-alias instead of hard-cutting.
const BG = { r: 242, g: 244, b: 239 };
const LOW = 15;
const HIGH = 45;

async function main() {
  const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];
    const dist = Math.sqrt((r - BG.r) ** 2 + (g - BG.g) ** 2 + (b - BG.b) ** 2);
    let alpha;
    if (dist <= LOW) alpha = 0;
    else if (dist >= HIGH) alpha = 255;
    else alpha = Math.round(((dist - LOW) / (HIGH - LOW)) * 255);

    out[i * 4] = r;
    out[i * 4 + 1] = g;
    out[i * 4 + 2] = b;
    out[i * 4 + 3] = alpha;
  }

  await sharp(out, { raw: { width, height, channels: 4 } }).png().toFile(OUT);
  console.log('wrote', OUT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
