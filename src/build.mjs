// Builds the static preview into ../docs (served by GitHub Pages from /docs).
// Usage: node src/build.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { BRANDS } from './content/brands.mjs';
import { brandPage, hubPage, indexPage } from './pages/collections.mjs';
import { generacPage } from './pages/generac.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'docs');

fs.rmSync(out, { recursive: true, force: true });
fs.cpSync(path.join(root, 'src', 'static'), out, { recursive: true });
fs.writeFileSync(path.join(out, '.nojekyll'), '');
fs.writeFileSync(path.join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n');

const write = (rel, html) => {
  const file = path.join(out, rel, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};

write('', indexPage());
write('brands', hubPage());
for (const b of BRANDS) write(`brands/${b.slug}`, brandPage(b));
write('brands/generac/generac-generator-installation', generacPage());

const pages = 3 + BRANDS.length;
console.log(`Built ${pages} pages into ${path.relative(root, out)} (${BRANDS.length} brands, ${BRANDS.reduce((n, b) => n + b.services.length, 0)} brand services).`);
