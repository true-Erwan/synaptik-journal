// One-off extraction script.
// Reads the OLD simulator (read-only) and writes clean JSON data files into src/data.
// It NEVER modifies the source HTML.
//
// Usage: node scripts/extract-data.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC_HTML = resolve(ROOT, '..', 'simulateur_synaptik.html');
const OUT_DIR = resolve(ROOT, 'src', 'data');
mkdirSync(OUT_DIR, { recursive: true });

const html = readFileSync(SRC_HTML, 'utf8');

/**
 * Extract the array literal that follows a `key: ` label inside the DATASETS object,
 * by balancing brackets starting at the first `[`.
 */
function sliceArrayAfter(source, fromIndex, label) {
  const labelIdx = source.indexOf(label, fromIndex);
  if (labelIdx === -1) throw new Error(`Label not found: ${label}`);
  const start = source.indexOf('[', labelIdx);
  if (start === -1) throw new Error(`No array after ${label}`);
  let depth = 0;
  let inStr = false;
  let strCh = '';
  let esc = false;
  for (let i = start; i < source.length; i++) {
    const c = source[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === strCh) { inStr = false; }
      continue;
    }
    if (c === '"' || c === "'") { inStr = true; strCh = c; continue; }
    if (c === '[') depth++;
    else if (c === ']') {
      depth--;
      if (depth === 0) {
        return { text: source.slice(start, i + 1), end: i + 1 };
      }
    }
  }
  throw new Error(`Unbalanced array for ${label}`);
}

// Locate the DATASETS object and the 'en' / 'fr' language blocks.
const datasetsIdx = html.indexOf('const DATASETS');
if (datasetsIdx === -1) throw new Error('DATASETS not found');

function extractLang(langKey) {
  // find the lang block: '<lang>': {
  const langMarker = html.indexOf(`'${langKey}': {`, datasetsIdx);
  if (langMarker === -1) throw new Error(`Lang block not found: ${langKey}`);
  const subs = sliceArrayAfter(html, langMarker, 'substances:');
  const cats = sliceArrayAfter(html, langMarker, 'categories:');
  return {
    substances: JSON.parse(subs.text),
    categories: JSON.parse(cats.text),
  };
}

const en = extractLang('en');
const fr = extractLang('fr');

console.log(`EN: ${en.substances.length} substances, ${en.categories.length} categories`);
console.log(`FR: ${fr.substances.length} substances, ${fr.categories.length} categories`);

writeFileSync(resolve(OUT_DIR, 'substances.en.json'), JSON.stringify(en.substances));
writeFileSync(resolve(OUT_DIR, 'substances.fr.json'), JSON.stringify(fr.substances));
writeFileSync(resolve(OUT_DIR, 'categories.en.json'), JSON.stringify(en.categories));
writeFileSync(resolve(OUT_DIR, 'categories.fr.json'), JSON.stringify(fr.categories));

// --- NON_DIVERTIBLE_DOSES (per-intake medical doses) ---
const ndMarker = html.indexOf('const NON_DIVERTIBLE_DOSES');
if (ndMarker !== -1) {
  const start = html.indexOf('{', ndMarker);
  let depth = 0, inStr = false, strCh = '', esc = false, end = -1;
  for (let i = start; i < html.length; i++) {
    const c = html[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'") { inStr = true; strCh = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  const objText = html.slice(start, end);
  // The source uses JS object literal (unquoted keys). Convert to JSON safely enough:
  // quote identifier keys and route keys.
  const jsonish = objText
    .replace(/([,{]\s*)'([^']+)'(\s*:)/g, '$1"$2"$3')   // 'key':
    .replace(/([,{]\s*)([A-Za-z_][\w-]*)(\s*:)/g, '$1"$2"$3') // bareKey:
    .replace(/'([^']*)'/g, '"$1"');
  try {
    const nd = JSON.parse(jsonish);
    writeFileSync(resolve(OUT_DIR, 'nonDivertibleDoses.json'), JSON.stringify(nd, null, 2));
    console.log(`NON_DIVERTIBLE_DOSES: ${Object.keys(nd).length} medicines`);
  } catch (e) {
    console.warn('Could not parse NON_DIVERTIBLE_DOSES automatically:', e.message);
  }
}

console.log('Extraction complete ->', OUT_DIR);
