// Regenerates the shared social image and icons. Run from the repo root: node scripts/generate-brand-images.mjs
import sharp from "sharp";
import fs from "fs";
const FONT = "Poppins, DejaVu Sans, sans-serif";

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4A3BC4"/>
      <stop offset="55%" stop-color="#6D5BF0"/>
      <stop offset="100%" stop-color="#FF63A5"/>
    </linearGradient>
    <linearGradient id="tile" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6D5BF0"/><stop offset="100%" stop-color="#FF63A5"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1040" cy="120" r="230" fill="#FFFFFF" fill-opacity="0.07"/>
  <circle cx="1110" cy="560" r="170" fill="#FFFFFF" fill-opacity="0.07"/>
  <g transform="translate(860 190) rotate(-6 150 190)">
    <rect width="300" height="380" rx="28" fill="#FFFFFF"/>
    <rect x="36" y="48" width="120" height="16" rx="8" fill="#EEEAFE"/>
    <rect x="36" y="88" width="228" height="12" rx="6" fill="#ECE8F6"/>
    <rect x="36" y="116" width="200" height="12" rx="6" fill="#ECE8F6"/>
    <rect x="36" y="144" width="228" height="12" rx="6" fill="#ECE8F6"/>
    <rect x="36" y="172" width="150" height="12" rx="6" fill="#ECE8F6"/>
    <rect x="36" y="268" width="104" height="44" rx="22" fill="#6D5BF0"/>
    <text x="88" y="297" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="18" fill="#FFFFFF">PDF</text>
  </g>
  <rect x="80" y="84" width="64" height="64" rx="16" fill="#FFFFFF"/>
  <text x="112" y="132" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="40" fill="#5142C9">P</text>
  <text x="164" y="130" font-family="${FONT}" font-weight="700" font-size="46" fill="#FFFFFF">OnlyPDF</text>
  <text x="80" y="290" font-family="${FONT}" font-weight="700" font-size="62" fill="#FFFFFF">Simple PDF tools.</text>
  <text x="80" y="372" font-family="${FONT}" font-weight="700" font-size="62" fill="#FFFFFF">Right in your browser.</text>
  <text x="80" y="450" font-family="${FONT}" font-weight="400" font-size="30" fill="#FFFFFF" fill-opacity="0.92">Merge, split, compress and convert PDFs.</text>
  <text x="80" y="498" font-family="${FONT}" font-weight="400" font-size="30" fill="#FFFFFF" fill-opacity="0.92">No sign-up. Your files stay on your device.</text>
  <text x="80" y="582" font-family="${FONT}" font-weight="600" font-size="26" fill="#FFFFFF" fill-opacity="0.85">onlypdf.online</text>
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 }).toFile("public/og-default.png");

const tile = (size, radius) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6D5BF0"/><stop offset="100%" stop-color="#FF63A5"/></linearGradient></defs>
  <rect width="${size}" height="${size}" rx="${radius}" fill="url(#g)"/>
  <text x="${size/2}" y="${size*0.69}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="${size*0.56}" fill="#FFFFFF">P</text>
</svg>`;
// Apple touch icon: full-bleed square, iOS applies its own rounding.
await sharp(Buffer.from(tile(180, 0))).png({ compressionLevel: 9 }).toFile("app/apple-icon.png");
// favicon.ico: a single 48x48 PNG-encoded image inside an ICO container.
const png48 = await sharp(Buffer.from(tile(48, 12))).png({ compressionLevel: 9 }).toBuffer();
const hdr = Buffer.alloc(22);
hdr.writeUInt16LE(0,0); hdr.writeUInt16LE(1,2); hdr.writeUInt16LE(1,4);
hdr.writeUInt8(48,6); hdr.writeUInt8(48,7); hdr.writeUInt8(0,8); hdr.writeUInt8(0,9);
hdr.writeUInt16LE(1,10); hdr.writeUInt16LE(32,12); hdr.writeUInt32LE(png48.length,14); hdr.writeUInt32LE(22,18);
fs.writeFileSync("app/favicon.ico", Buffer.concat([hdr, png48]));
console.log("done");
