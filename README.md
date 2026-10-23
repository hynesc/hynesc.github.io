# Christopher Hynes — portfolio

A research-first portfolio built with Astro, TypeScript, and Markdown. Static HTML is published to GitHub Pages at **https://chynes.org**. The design connects empirical research with data science, software, product evaluation, and business analysis.

## Local development

Use **Node 24 LTS**, selected by `.nvmrc` for local development and GitHub Actions. Astro requires Node 22.23.4 or newer. The repository uses npm and commits its lockfile.

```bash
nvm install
nvm use
npm ci
npm run dev
```

Follow the local URL printed by Astro. Editing a case study or layout updates the development preview. No API keys, Python/R runtime for research, or model servers are required.

## Production build and checks

```bash
npm run check
npm run build
npm run validate
npx playwright install chromium
npm test
```

The browser tests use Python 3's static HTTP server and run against `dist`, including navigation, static redirects, and no-JavaScript behavior. On a fresh Linux runner, use `npx playwright install --with-deps chromium` to install browser dependencies. Test output and failure traces go to `.review/test-results/`; generated review files are ignored by Git and are not published.

To inspect the production output with GitHub Pages-like static file handling:

```bash
python3 -m http.server 4391 --directory dist
```

Open **http://localhost:4391**. GitHub Pages provides the custom 404 behavior; the local Python server shows its default error for unknown paths. The custom page itself is available at `/404.html`.

`npm run audit` runs mobile Lighthouse checks against the homepage and flagship case study, writing reports to `.review`. Performance must reach 90 and accessibility 95.

`npm run screenshots` captures review images for desktop, tablet, and phone in the ignored `.review` directory. `npm run format` formats source files. `npm run social` regenerates the committed social-preview image.

## Editing the site

- **Project entries:** `src/content/projects/*.{md,mdx}`. Each entry is checked against the schema in `src/content.config.ts`. Metadata includes title, short title, summary, ISO date, categories, methods, display order, context, personal contribution, finding, and artifact links. The filename becomes the project slug. Optional `home` metadata holds the curated homepage title, description, category label, and link text; the homepage reads these alongside the shared project date and slug. A homepage title defaults to the case-study title unless overridden.
- **Homepage and background:** `src/pages`. The homepage is intentionally curated. Adding a project automatically adds it to the work index, but featuring it on the homepage is an editorial choice.
- **Design:** `src/styles/global.css`, shared components, and `src/layouts/Base.astro`. Homepage-specific layout refinements are scoped in `src/pages/index.astro`. Fonts are self-hosted through Fontsource packages; no external font request is made.
- **Downloads and images:** `public/assets` and `public/projects`. These are ordinary static assets served by Astro. Replace `public/assets/resume.pdf` to update every résumé link. Remove assets when they are no longer used; keep papers and notebooks available as supporting project evidence.

A project can belong to multiple categories: `Research & evaluation`, `Data & ML`, and `Systems & interfaces`. The work index searches titles, summaries, categories, methods, project context, contributions, and findings. Lower `order` values appear first.

Prefer question → contribution → approach → evidence → limitations → implications when writing a case study. Clearly identify team contributions, synthetic data, coursework, prototype status, and the distinction between observed results and proposed next steps. Do not turn associations into causal claims or imply measured product/business impact without evidence.

The graduate ML overview (`ml-experimentation.mdx`) leads with three concrete contributions, then describes the methods and reasoning in each of four studies. It distinguishes course-assigned scope from the author's implementation, design choices under resource constraints, and analytical judgment. Its examples describe reasoning without revealing method rankings, numerical answers, selected configurations, or experiment recipes. The rubric review and source notes live outside this repository with the private coursework. Keep the underlying rubrics, course reports, code, notebooks, figures, tuned configurations, and experiment outputs out of this public repository, including its Git history. The author confirmed that course policy permits private sharing of papers with employers, so the page provides an email request link. This permission does not authorize public downloads or imply permission to distribute other course materials.

The shared type scale in `global.css` uses rem units: 16px body copy, 17px long-form copy on larger screens, 14px controls and supporting text, and 12–13px metadata and captions at the default browser font size. Chart and architecture labels use HTML text so they remain readable as cards shrink.

## Visitor analytics

`src/scripts/analytics.ts` loads the hosted GoatCounter script for **https://hynesc.goatcounter.com/count** only in a production build on `https://chynes.org`. Local development, LAN previews, other domains, and embedded pages do not load it. Browsers sending Do Not Track or Global Privacy Control also skip it. The footer links to [GoatCounter’s privacy details](https://www.goatcounter.com/help/privacy).

Only pageviews are configured. Click-event binding is disabled; there is no session replay. The reported page is its canonical path without query strings or fragments. Referrers are limited to the external origin, excluding their paths and query strings. No analytics cookies or browser storage are used by GoatCounter; its service temporarily processes IP addresses and browser headers to distinguish visits.

In GoatCounter’s dashboard, **keep individual-pageview collection disabled** (the default) so stored statistics remain aggregate. Disable browser, location, language, and screen-size breakdowns there too if you only want page totals. Those account settings are separate from this repository. Ad blockers may prevent counting; treat the numbers as approximate. Use GoatCounter’s [own-visit exclusion](https://www.goatcounter.com/help/skip-dev) to keep your browsing out of the totals.

The script loads asynchronously and is not required for any site feature. Remove its import in `Base.astro` and the footer note to disable analytics.

## Research figures

The interactive readmission figure reads from `src/data/readmission.ts`. Values are transcribed from Tables I and II of the existing report, visually checked against pages 3–4. The plot shows reported means ± **standard deviation**, not confidence intervals. Each metric has one fixed scale across configurations. The full table is available without JavaScript.

If updating results, check the paper and update the data, interpretation, source documentation, and any tests together. Do not invent raw trials from aggregate statistics. The synthetic-control figure is the original thesis image; no counterfactual points have been reconstructed.

The thesis R code lives in `src/content/thesis-code.md` and is rendered by an Astro page at `/projects/chile-neoliberal-reforms/code/`. It is presented as a reference and is not executed during builds.

## Routing and deployment

Astro builds ready-to-serve static output into `dist`. `npm run build` runs `astro build` directly.

- `/` — homepage
- `/projects/` — searchable project index
- `/projects/<slug>/` — project entries
- `/experience/` — experience, education, and skills
- `/about/` — personal background and interests
- `/projects/chile-neoliberal-reforms/code/` — thesis R code
- `/404.html` — GitHub Pages error page

Use these canonical routes for internal links. Four previously shared `.html` page addresses are declared in `astro.config.mjs` using Astro's built-in static redirects. No custom output rewriting or server configuration is needed. The sitemap includes canonical pages and excludes redirect/error pages.

`npm run validate` checks generated pages, canonical URLs, sitemap coverage, local links, fragments, and referenced downloads. `public/.nojekyll` and `public/CNAME` are copied by Astro along with the other static files.

The GitHub Actions workflow validates pull requests to `main`. Pushes to `main` build, test, and deploy the same artifact through GitHub Pages. Manual runs deploy only when run against `main`.

CI uses the official Playwright container with browsers and Linux dependencies included. Keep its version in `.github/workflows/publish.yml` aligned with the exact `@playwright/test` version in `package.json` and `package-lock.json`. Node 24 is selected through `.nvmrc`; deployment requires all checks to pass.

GitHub Pages uses **GitHub Actions** as its publishing source and **chynes.org** as its custom domain. Keep `public/CNAME` and the Astro `site` setting aligned with that domain.

This site serves static project descriptions and downloads. Contact uses `mailto:resume@chynes.org`; linked external demos run on their respective hosts.
