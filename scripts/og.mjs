// Generates the Open Graph images (PNG 1200x630) from SVG, one per language.
// Run manually with `npm run og` after changing the tagline; output is committed
// in public/og/ so the site build itself needs no native module.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { inflateSync } from "node:zlib";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fontDir = join(root, "node_modules/@fontsource/manrope/files");

// resvg reads TTF/OTF, @fontsource ships WOFF: unwrap WOFF 1.0 into a plain sfnt.
function woffToSfnt(buf) {
  if (buf.readUInt32BE(0) !== 0x774f4646) throw new Error("not a WOFF file");
  const flavor = buf.readUInt32BE(4);
  const numTables = buf.readUInt16BE(12);
  const tables = [];
  for (let i = 0; i < numTables; i++) {
    const o = 44 + i * 20;
    const tag = buf.readUInt32BE(o);
    const offset = buf.readUInt32BE(o + 4);
    const compLength = buf.readUInt32BE(o + 8);
    const origLength = buf.readUInt32BE(o + 12);
    const checksum = buf.readUInt32BE(o + 16);
    const raw = buf.subarray(offset, offset + compLength);
    const data = compLength < origLength ? inflateSync(raw) : raw;
    tables.push({ tag, checksum, data });
  }
  let searchRange = 1, entrySelector = 0;
  while (searchRange * 2 <= numTables) { searchRange *= 2; entrySelector++; }
  searchRange *= 16;
  const headerLen = 12 + 16 * numTables;
  const total = tables.reduce((n, t) => n + ((t.data.length + 3) & ~3), headerLen);
  const out = Buffer.alloc(total);
  out.writeUInt32BE(flavor, 0);
  out.writeUInt16BE(numTables, 4);
  out.writeUInt16BE(searchRange, 6);
  out.writeUInt16BE(entrySelector, 8);
  out.writeUInt16BE(numTables * 16 - searchRange, 10);
  let offset = headerLen;
  tables.forEach((t, i) => {
    const d = 12 + i * 16;
    out.writeUInt32BE(t.tag, d);
    out.writeUInt32BE(t.checksum, d + 4);
    out.writeUInt32BE(offset, d + 8);
    out.writeUInt32BE(t.data.length, d + 12);
    t.data.copy(out, offset);
    offset += (t.data.length + 3) & ~3;
  });
  return out;
}

// resvg-js 2.6 loads fonts from files only: write the unwrapped TTFs to .tmp/ (gitignored).
const tmpFonts = join(root, ".tmp/og-fonts");
mkdirSync(tmpFonts, { recursive: true });
const fontFiles = [400, 700, 800].map((w) => {
  const file = join(tmpFonts, `manrope-latin-${w}.ttf`);
  writeFileSync(file, woffToSfnt(readFileSync(join(fontDir, `manrope-latin-${w}-normal.woff`))));
  return file;
});

// Logo for dark backgrounds, used as a nested SVG.
const logo = readFileSync(join(root, "public/brand/housecairn-logo-fond-sombre.svg"), "utf8")
  .replace(/<svg[^>]*>/, '<svg x="80" y="70" width="438" height="128" viewBox="0 0 876 256">');

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const texts = {
  en: {
    lines: ["What to do in the house,", "where, when, with what,", "and for how much."],
    foot: "Free and open-source · Self-hosted · housecairn.app",
  },
  fr: {
    lines: ["Quoi faire dans la maison,", "où, quand, avec quoi", "et pour combien."],
    foot: "Libre et open source · Auto-hébergé · housecairn.app",
  },
};

mkdirSync(join(root, "public/og"), { recursive: true });
for (const [lang, t] of Object.entries(texts)) {
  const lines = t.lines
    .map((l, i) => `<text x="88" y="${290 + i * 72}" font-family="Manrope" font-weight="800" font-size="60" fill="#FFFFFF">${esc(l)}</text>`)
    .join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#1F3A3D"/>
  <rect x="0" y="600" width="1200" height="30" fill="#C8A27C"/>
  <rect x="0" y="590" width="1200" height="10" fill="#8FA39A"/>
  ${logo}
  ${lines}
  <text x="88" y="540" font-family="Manrope" font-weight="700" font-size="28" fill="#E3EBE6">${esc(t.foot)}</text>
</svg>`;
  const png = new Resvg(svg, {
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: "Manrope" },
    fitTo: { mode: "width", value: 1200 },
  }).render().asPng();
  writeFileSync(join(root, `public/og/og-${lang}.png`), png);
  writeFileSync(join(root, `scripts/og-${lang}.svg`), svg);
  console.log(`public/og/og-${lang}.png ${png.length} bytes`);
}
