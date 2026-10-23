# Site validation

Checked locally on 2026-10-23 using Node 24 and the production Astro build.

## Build and routing

- `npm run build` runs `astro build` directly, without post-processing.
- Output contains 19 full pages, including 13 project entries and the 404 page, plus four Astro-generated redirect pages.
- Canonical routes use directories: `/about/`, `/experience/`, `/projects/`, and `/projects/chile-neoliberal-reforms/code/`.
- Four previously shared `.html` page addresses redirect to those routes. They work in the development server and in static output without JavaScript.
- The sitemap contains canonical pages and excludes redirects and the error page.
- `public/CNAME` and `public/.nojekyll` are copied by Astro. Publishing remains through GitHub Actions and GitHub Pages at `chynes.org`.

## Automated checks

- Astro/TypeScript: no errors, warnings, or hints.
- Static validation: canonical URLs, sitemap coverage, local links, fragments, project routes, and referenced downloads pass.
- Playwright: 42 passing tests across desktop and mobile Chromium. Covers navigation, filtering, project discovery, results controls, accessibility, canonical URLs, responsive layouts, enlarged text, redirects, no-JavaScript content, and analytics privacy settings.

```bash
npm run check
npm run build
npm run validate
npm test
```

Install Chromium with `npx playwright install chromium` before the first local browser test. CI uses the version-matched Playwright container.

## Visual and performance review

Reviewed desktop, tablet, and phone screenshots of the homepage, project index, About, and FoodAI. Browser checks cover 320 px widths and enlarged text. The thesis code page and readmission figure remain accessible.

Mobile Lighthouse measurements from the local production build:

| Page                   | Performance | Accessibility | Best practices | SEO | CLS |
| ---------------------- | ----------: | ------------: | -------------: | --: | --: |
| Homepage               |          97 |           100 |            100 | 100 |   0 |
| Readmission case study |          99 |           100 |            100 | 100 |   0 |

Run `npm run screenshots` or `npm run audit` to regenerate ignored review artifacts in `.review/`.

## Supporting material

Project reports, notebooks, the published résumé, and the thesis R code remain available. Download checksums were checked during the routing cleanup. Fourteen unused presentation assets were removed; images used by the site remain.

The readmission figure reports means and standard deviations transcribed from the existing paper. Research experiments are not executed by the site build. Private graduate ML coursework remains outside this repository; the public overview offers an employer request link.

FoodAI's screenshot comes from a local run with an example account and ingredients. Its app build and main account, pantry, shopping, preference, and recipe-card flows were checked with PostgreSQL and the mock recipe provider. Live model recipe outputs were not evaluated. Its source repository includes the corrected setup guide and environment template.

## Analytics

GoatCounter loads only in production on `https://chynes.org`, outside frames, and when Do Not Track and Global Privacy Control are not enabled. Tests intercept analytics scripts so they do not create real visits. Page paths omit queries/fragments; referrers include only external origins; click-event binding is disabled.

Keep individual-pageview collection disabled in GoatCounter's account settings to retain aggregate statistics. The footer links to its privacy details.
