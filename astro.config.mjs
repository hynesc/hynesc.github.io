import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chynes.org',
  output: 'static',
  redirects: {
    '/about.html': '/about/',
    '/experience.html': '/experience/',
    '/projects.html': '/projects/',
    '/projects/chile-neoliberal-reforms/code.html': '/projects/chile-neoliberal-reforms/code/',
  },
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !page.includes('/404') && !page.includes('.html') }),
  ],
  build: { format: 'directory' },
  markdown: { shikiConfig: { theme: 'github-light-high-contrast' } },
});
