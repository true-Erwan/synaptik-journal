// Generates simple valid PNG app icons (navy background with a teal/white
// "link" glyph) without any image dependency, using Node's zlib.
import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const PUB = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public');

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}
function chunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function makePng(size, maskable) {
  const navy = [30, 42, 90];
  const teal = [43, 182, 168];
  const white = [255, 255, 255];
  const pad = Math.round(size * (maskable ? 0.2 : 0.12));
  const stroke = Math.max(2, Math.round(size * 0.07));
  const r = Math.round((size - 2 * pad) / 4);
  const cy = size / 2;
  const cx1 = pad + r;
  const cx2 = size - pad - r;

  function nearRing(x, y, cx) {
    const d = Math.hypot(x - cx, y - cy);
    return Math.abs(d - r) <= stroke / 2;
  }
  function onBar(x, y) {
    return y >= cy - stroke / 2 && y <= cy + stroke / 2 && x >= cx1 && x <= cx2;
  }

  // Raw RGBA scanlines with filter byte 0 per row.
  const row = size * 4 + 1;
  const raw = Buffer.alloc(row * size);
  for (let y = 0; y < size; y++) {
    raw[y * row] = 0;
    for (let x = 0; x < size; x++) {
      let col = navy;
      if (nearRing(x, y, cx1)) col = teal;
      else if (nearRing(x, y, cx2)) col = white;
      else if (onBar(x, y)) col = white;
      const o = y * row + 1 + x * 4;
      raw[o] = col[0];
      raw[o + 1] = col[1];
      raw[o + 2] = col[2];
      raw[o + 3] = 255;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    sig,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

writeFileSync(resolve(PUB, 'icon-192.png'), makePng(192, false));
writeFileSync(resolve(PUB, 'icon-512.png'), makePng(512, false));
writeFileSync(resolve(PUB, 'icon-512-maskable.png'), makePng(512, true));
writeFileSync(resolve(PUB, 'apple-touch-icon.png'), makePng(180, false));
console.log('Icons generated in', PUB);
