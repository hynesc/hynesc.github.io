import { readdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
// Astro's directory output nests explicit .html routes. Keep Quarto's exact URLs
// as real files so GitHub Pages needs no redirect or SPA fallback.
async function flatten(dir) {
  for (const item of await readdir(dir, { withFileTypes: true })) {
    if (!item.isDirectory()) continue;
    const entry = path.join(dir, item.name);
    await flatten(entry);
    if (item.name.endsWith('.html')) {
      const temporary = entry + '.legacy-output';
      await rename(path.join(entry, 'index.html'), temporary);
      await rm(entry, { recursive: true });
      await rename(temporary, entry);
    }
  }
}
await flatten('dist');
for (const name of await readdir('dist')) {
  if (name.startsWith('sitemap') && name.endsWith('.xml')) {
    const file = path.join('dist', name);
    await writeFile(file, (await readFile(file, 'utf8')).replace(/\.html\//g, '.html'));
  }
}
await writeFile('dist/.nojekyll', '');
console.log('Preserved legacy HTML URLs and static Pages output.');
