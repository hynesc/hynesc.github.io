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

The browser tests use Python 3's static HTTP server and run against `dist`, including exact legacy `.html` URLs. On a fresh Linux runner, use `npx playwright install --with-deps chromium` to install browser dependencies.

To inspect the production output with GitHub Pages-like static file handling:

```bash
python3 -m http.server 4391 --directory dist
```

Open **http://localhost:4391**. GitHub Pages provides the custom 404 behavior; the local Python server shows its default error for unknown paths. The custom page itself is available at `/404.html`.

`npm run audit` runs mobile Lighthouse checks against the homepage and flagship case study, writing reports to `.review`. Performance must reach 90 and accessibility 95.

`npm run screenshots` captures review images for desktop, tablet, and phone in the ignored `.review` directory. `npm run format` formats source files. `npm run social` regenerates the committed social-preview image.

## Editing the site

- **Case studies:** `src/content/projects/*.md`. Each entry is checked against the schema in `src/content.config.ts`. Metadata includes title, short title, summary, ISO date, categories, methods, display order, context, personal contribution, finding, and artifact links. The filename becomes the project slug; keep existing filenames stable. Optional `home` metadata holds the curated homepage title, description, category label, and link text; the homepage reads these alongside the shared project date and slug. A homepage title defaults to the case-study title unless overridden.
- **Homepage and background:** `src/pages`. The homepage is intentionally curated. Adding a project automatically adds it to the work index, but featuring it on the homepage is an editorial choice.
- **Design:** `src/styles/global.css`, shared components, and `src/layouts/Base.astro`. Homepage-specific layout refinements are scoped in `src/pages/index.astro`. Fonts are self-hosted through Fontsource packages; no external font request is made.
- **Downloads and original figures:** `public/assets` and `public/projects`. Keep published filenames stable. The papers, notebooks, and original images are preserved unchanged. Replace `public/assets/resume.pdf` to update every résumé link on the site.

A project can belong to multiple categories: `Research & evaluation`, `Data & ML`, and `Systems & interfaces`. The work index searches titles, summaries, categories, methods, project context, contributions, and findings. Lower `order` values appear first.

Prefer question → contribution → approach → evidence → limitations → implications when writing a case study. Clearly identify team contributions, synthetic data, coursework, prototype status, and the distinction between observed results and proposed next steps. Do not turn associations into causal claims or imply measured product/business impact without evidence.

## Research figures

The interactive readmission figure reads from `src/data/readmission.ts`. Values are transcribed from Tables I and II of the existing report, visually checked against pages 3–4. The plot shows reported means ± **standard deviation**, not confidence intervals. Each metric has one fixed scale across configurations. The full table is available without JavaScript.

If updating results, check the paper and update the data, interpretation, source documentation, and any tests together. Do not invent raw trials from aggregate statistics. The synthetic-control figure is the original thesis image; no counterfactual points have been reconstructed.

The thesis R code is retained as a static reference in `src/content/thesis-code.md` and rendered at its original `code.html` URL. It is not executed during builds.

## URLs and deployment

Astro builds static output into `dist`. `scripts/finalize-build.mjs` converts Astro's directory output for explicitly named `.html` routes into real `.html` files and normalizes sitemap entries. This preserves the previous Quarto URLs without requiring server redirects:

- `/`, `/index.html`, `/projects.html`, `/experience.html`, `/about.html`
- `/projects/<existing-slug>/` and `/projects/<existing-slug>/index.html`
- `/projects/chile-neoliberal-reforms/code.html`
- Existing résumé, paper, notebook, image, and favicon paths

`npm run validate` checks generated pages, internal links and fragments, legacy files, and the domain. Use the full `npm run build` command rather than calling `astro build` alone.

The GitHub Actions workflow validates pull requests to `main`. Pushes to `main` build, test, and deploy the same artifact through GitHub Pages. Feature branches and pull requests do not deploy. Manual runs deploy only when run against `main`.

GitHub Pages must retain **GitHub Actions** as its publishing source and **chynes.org** as its custom domain. `public/CNAME` and the Astro `site` setting preserve that domain. No DNS changes are part of this rebuild.

The site does not run live models or collect contact submissions. Contact uses `mailto:resume@chynes.org`; linked external demos depend on their respective hosts.

## Migration

This implementation starts from `main` commit `038da37`. The Quarto frontend has been replaced, while Git history retains the original sources. All 29 original download/image files were moved into `public` without changing their bytes. The résumé PDF was subsequently updated from `assets/resume.pdf` on `codex/researcher-portfolio`; its public URL is unchanged.
