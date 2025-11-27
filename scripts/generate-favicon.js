import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../attached_assets/Logo7_1764254661520.png');
const outputPath = path.join(__dirname, '../public/favicon.png');

async function generateFavicon() {
  const size = 512;
  const cornerRadius = 100;

  const roundedCornersSvg = `
    <svg width="${size}" height="${size}">
      <rect x="0" y="0" width="${size}" height="${size}" rx="${cornerRadius}" ry="${cornerRadius}" fill="white"/>
    </svg>
  `;

  await sharp(inputPath)
    .resize(size, size, { fit: 'cover' })
    .composite([
      {
        input: Buffer.from(roundedCornersSvg),
        blend: 'dest-in'
      }
    ])
    .png()
    .toFile(outputPath);

  console.log('Favicon generated successfully at:', outputPath);
}

generateFavicon().catch(console.error);
