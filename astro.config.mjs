import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chynes.org',
  output: 'static',
  integrations: [mdx(), sitemap({ filter: (page) => !page.includes('/404') })],
  build: { format: 'directory' },
  markdown: { shikiConfig: { theme: 'github-light-high-contrast' } },
});
