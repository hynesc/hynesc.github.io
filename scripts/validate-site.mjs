import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const site = new URL('https://chynes.org/');
const errors = [];
async function files(dir) {
  return (
    await Promise.all(
      (await readdir(dir, { withFileTypes: true })).map((entry) =>
        entry.isDirectory() ? files(path.join(dir, entry.name)) : path.join(dir, entry.name),
      ),
    )
  ).flat();
}
async function resolveFile(pathname) {
  let file = path.join(root, decodeURIComponent(pathname));
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    return (await stat(file)).isFile() ? file : null;
  } catch {
    return null;
  }
}
const htmlFiles = (await files(root)).filter((file) => file.endsWith('.html'));
const pages = new Map();
for (const file of htmlFiles) {
  const content = await readFile(file, 'utf8');
  const relative = path.relative(root, file).split(path.sep).join('/');
  const url = new URL(relative.replace(/(?:^|\/)index\.html$/, '/'), site);
  const canonical = content.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1];
  const redirect = content.match(
    /<meta\b[^>]*http-equiv="refresh"[^>]*content="\d+;url=([^"]+)"/i,
  )?.[1];
  if (!canonical) errors.push(`${relative}: missing canonical URL`);
  if (!redirect && !content.includes('<h1')) errors.push(`${relative}: missing h1`);
  if (!redirect && canonical !== url.href)
    errors.push(`${relative}: canonical must be ${url.href}`);
  if (redirect && new URL(redirect, site).href !== canonical)
    errors.push(`${relative}: redirect and canonical disagree`);
  pages.set(file, { content, relative, url, canonical, redirect });
}

for (const { content, relative, url, redirect } of pages.values()) {
  const links = [...content.matchAll(/(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1]);
  if (redirect) links.push(redirect);
  for (const raw of links) {
    const value = raw.replaceAll('&amp;', '&');
    if (/^(mailto:|tel:|data:|javascript:)/.test(value)) continue;
    const target = new URL(value, url);
    if (target.origin !== site.origin) continue;
    const file = await resolveFile(target.pathname);
    if (!file) {
      errors.push(`${relative}: missing ${value}`);
      continue;
    }
    const page = pages.get(file);
    if (!redirect && page?.redirect)
      errors.push(`${relative}: link should use the canonical route: ${value}`);
    if (target.hash && page) {
      const id = decodeURIComponent(target.hash.slice(1));
      if (!page.content.includes(`id="${id}"`) && !page.content.includes(`id='${id}'`))
        errors.push(`${relative}: missing fragment ${value}`);
    }
  }
}

const slugs = (await readdir('src/content/projects'))
  .filter((file) => /\.mdx?$/.test(file))
  .map((file) => file.replace(/\.mdx?$/, ''));
for (const route of [
  '/',
  '/about/',
  '/experience/',
  '/projects/',
  '/404.html',
  '/projects/chile-neoliberal-reforms/code/',
  ...slugs.map((slug) => `/projects/${slug}/`),
]) {
  if (!(await resolveFile(route))) errors.push(`Missing page: ${route}`);
}
for (const file of [
  'assets/resume.pdf',
  'favicon.svg',
  'social-preview.png',
  'CNAME',
  '.nojekyll',
]) {
  if (!(await resolveFile('/' + file))) errors.push(`Missing public file: ${file}`);
}
if ((await readFile(path.join(root, 'CNAME'), 'utf8')).trim() !== site.hostname)
  errors.push('Unexpected custom domain');

const sitemapFiles = (await files(root)).filter((file) => /sitemap.*\.xml$/.test(file));
const sitemapUrls = new Set();
for (const file of sitemapFiles) {
  const xml = await readFile(file, 'utf8');
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = new URL(match[1]);
    if (url.pathname.endsWith('.xml')) continue;
    if (url.origin !== site.origin || url.pathname.includes('.html'))
      errors.push(`Sitemap contains a noncanonical page: ${url.href}`);
    if (!(await resolveFile(url.pathname))) errors.push(`Sitemap page is missing: ${url.href}`);
    sitemapUrls.add(url.href);
  }
}
for (const { content, canonical, redirect } of pages.values()) {
  if (!redirect && !content.includes('content="noindex"') && !sitemapUrls.has(canonical))
    errors.push(`Page is missing from the sitemap: ${canonical}`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(
  `Validated ${pages.size} HTML files (${[...pages.values()].filter((p) => p.redirect).length} redirects), ${slugs.length} projects, canonical URLs, sitemap, links, fragments, and downloads.`,
);
