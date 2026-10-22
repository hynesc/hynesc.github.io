import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const errors = [];
async function files(dir) {
  return (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((e) =>
        e.isDirectory() ? files(path.join(dir, e.name)) : path.join(dir, e.name),
      ),
    )
  ).flat();
}
async function exists(file) {
  try {
    return await stat(file);
  } catch {
    return null;
  }
}
const html = (await files(root)).filter((f) => f.endsWith('.html'));
for (const file of html) {
  const content = await readFile(file, 'utf8');
  const relative = path.relative(root, file).replaceAll(path.sep, '/');
  const url = new URL(relative, 'https://chynes.org/');
  for (const match of content.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    const value = match[1].replaceAll('&amp;', '&');
    if (/^(mailto:|tel:|data:|javascript:)/.test(value)) continue;
    const target = new URL(value, url);
    if (target.origin !== url.origin) continue;
    let local = path.join(root, decodeURIComponent(target.pathname));
    let info = await exists(local);
    if (info?.isDirectory()) {
      local = path.join(local, 'index.html');
      info = await exists(local);
    }
    if (!info) {
      errors.push(`${relative}: missing ${value}`);
      continue;
    }
    if (target.hash && local.endsWith('.html')) {
      const targetHtml = await readFile(local, 'utf8');
      const id = decodeURIComponent(target.hash.slice(1));
      if (!targetHtml.includes(`id="${id}"`) && !targetHtml.includes(`id='${id}'`))
        errors.push(`${relative}: missing fragment ${value}`);
    }
  }
  if (!content.includes('<h1')) errors.push(`${relative}: missing h1`);
  if (!content.includes('rel="canonical"')) errors.push(`${relative}: missing canonical`);
}
const slugs = (await readdir('src/content/projects')).map((f) => f.replace(/\.mdx?$/, ''));
for (const slug of slugs) {
  if (!(await exists(path.join(root, 'projects', slug, 'index.html'))))
    errors.push(`Missing case study: ${slug}`);
}
for (const route of [
  'index.html',
  'about.html',
  'experience.html',
  'projects.html',
  '404.html',
  'projects/chile-neoliberal-reforms/code.html',
  'assets/resume.pdf',
  'social-preview.png',
  'CNAME',
  '.nojekyll',
]) {
  const info = await exists(path.join(root, route));
  if (!info?.isFile()) errors.push(`Missing public file: ${route}`);
}
if ((await readFile(path.join(root, 'CNAME'), 'utf8')).trim() !== 'chynes.org')
  errors.push('Unexpected custom domain');
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(
  `Validated ${html.length} HTML pages, ${slugs.length} projects, local links, fragments, and legacy files.`,
);
