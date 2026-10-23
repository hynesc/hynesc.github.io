# Implementation validation

Validated locally on 2026-10-23 against the production static build. Current review: FoodAI added on `main` after consolidating the repository into a single checkout. The original rebuild started directly from `main` at `038da37`.

## Checks

- Astro/TypeScript: 0 errors, warnings, or hints.
- Production build: 19 HTML pages, including 13 project entries.
- Internal-link validation: all local links, fragment targets, legacy HTML files, domain file, and referenced downloads pass.
- Playwright: 40 passing tests across desktop Chrome and mobile Chromium. Covers navigation, filtering and empty results, figure state and fixed scales, accessibility, overflow, enlarged text, analytics privacy controls, and no-JavaScript content.
- Original artifacts: 28 of the 29 files moved into `public` still match their `main` versions byte-for-byte. The résumé was subsequently replaced with the exact PDF from `codex/researcher-portfolio:assets/resume.pdf`.
- Thesis code: all 23 original R code blocks are unchanged. Markdown heading levels were adjusted for the new page hierarchy.
- Production dependency audit: no known vulnerabilities reported.

## Mobile Lighthouse

Local production output, simulated mobile defaults. These homepage/readmission measurements are from the earlier homepage review on 2026-10-23. FoodAI validation is recorded separately below.

| Page                   | Performance | Accessibility | Best practices | SEO | CLS |
| ---------------------- | ----------: | ------------: | -------------: | --: | --: |
| Homepage               |          97 |           100 |            100 | 100 |   0 |
| Readmission case study |          99 |           100 |            100 | 100 |   0 |

Run `npm run audit` to repeat. Detailed reports are in `.review/lighthouse-home.json` and `.review/lighthouse-case.json`.

## Visual review

Inspected the homepage at desktop (1440 px), tablet (820 px), and phone (390 px) widths, along with the case study, mobile work index, and 320 px figure. Responsive checks also cover 200% text size at 390 and 820 px. Chart and architecture labels use native HTML text, and narrow cards reflow rather than shrinking labels. Final images are generated with reduced motion and fully loaded fonts. Run `npm run screenshots` to regenerate:

- `.review/home-desktop.png`
- `.review/home-desktop-viewport.png`
- `.review/home-tablet.png`
- `.review/home-mobile.png`
- `.review/figure-mobile.png`
- `.review/case-study.png`
- `.review/work-mobile.png`
- `.review/about-desktop.png`
- `.review/about-mobile.png`
- `.review/foodai-desktop.png`
- `.review/foodai-mobile.png`

Review artifacts are ignored by Git. The original PDF reports remain unchanged. The résumé was updated from `codex/researcher-portfolio:assets/resume.pdf`; coursework and the GreyNoise dashboard description were checked against that document. Model experiments were not rerun; reported results were checked against the existing portfolio and supporting reports, including visual verification of the readmission tables.

## Homepage and About review

- The readmission project starts at approximately 815 px on a 1440×1000 viewport, compared with 961 px before this change. Its full title now fits in that opening viewport.
- At 390×844, the first project starts at approximately 911 px instead of 1045 px; the selected-research heading is visible in the opening viewport. At the shorter 390×664 browser viewport, both primary hero buttons remain fully visible.
- The main headline and readable type scale retain their sizes. Reduced spacing, a shorter introduction, and an inline About link bring the work forward.
- The section heading is “Selected research,” with “01 / Work” as its small label.
- A compact homepage highlight links directly to the graduate ML experiments. Its copy lives in shared project metadata; the revised case-study body is retained from `main`.
- About introduces lifting, reading interests, small personal coding projects, the Madrid study year, languages, and the existing travel map. Background, education, and résumé links remain accessible. The repeated large monogram and generic methodology copy were removed.
- Homepage and About layouts were checked at 320, 390, 700, 820, 1024, 1440, and 1920 px, plus 200% text at 390 and 820 px, without horizontal overflow.

## FoodAI addition

- FoodAI appears under Systems & interfaces and is linked from About. The page describes a personal prototype built with AI coding tools, with source/setup links and an actual app screenshot using sample data.
- The app's production build passed in an isolated checkout of `hynesc/ai-recipes` at `d9dfd5c`, with PostgreSQL 16 and the built-in mock provider. No live model API was used.
- Browser verification passed registration, sign-in, pantry creation, shopping/purchase transfer, saved preferences, mock recipe generation and expansion, used-up/replenishment flow, sign-out, unauthenticated API rejection, and data persistence after signing back in.
- The missing environment template and setup instructions were fixed in the FoodAI repository at `a2abc0f`. Local `.env` files remain ignored.
- The screenshot uses a synthetic example account and ingredients. The portfolio explains the mock-provider verification scope and offers a full-size image link.
- Portfolio search finds FoodAI and opens its source-linked project page. Desktop/mobile accessibility tests cover the new route. FoodAI, About, and the index fit at 320, 390, 820, and 1440 px.
- Temporary app and database processes were stopped after verification. The portfolio preview remains available on port 4395.

## Analytics

- Hosted GoatCounter endpoint: `https://hynesc.goatcounter.com/count`.
- The real production bundle was tested on an intercepted `https://chynes.org` origin. The analytics script was stubbed; no visits were sent to the live counter.
- Canonical page paths exclude query strings and fragments. External referrers include only their origin. Click-event binding is disabled.
- Local previews, Do Not Track, and Global Privacy Control produce no third-party analytics requests. The loader also restricts operation to the production HTTPS hostname and top-level pages.
- The footer includes a short disclosure linking GoatCounter’s privacy policy.
- Account-side settings were not accessed: individual-pageview collection should remain disabled (GoatCounter’s default) to retain aggregate statistics.

## Publication

The workflow validates pull requests and deploys only from `main`. Merge and publication status are recorded in Git and GitHub Actions. GitHub Pages retains the existing `chynes.org` custom domain. Production deployments run after all build and browser checks pass.

## Review before merge

- Direct navigation links expose skills and contact details from every page. The Experience page links to research/industry, education, skills, and honors.
- Project search includes context, contribution, and findings; language/tool tags identify the Python and Docker implementations explicitly.
- Navigation was checked at 320, 390, 820, and 1440 pixels without horizontal overflow.
- Public code links return successful responses. The Figma prototype responds successfully to a normal GET request; its HEAD response is misleading.
- Streamlit demos can sleep after inactivity. Demo links explain this behavior and keep source code visible as an alternative.
- The supplied résumé’s Quarto description remains an acknowledged follow-up; the site itself documents Astro accurately.

- CI uses Node 24 LTS. A runner-selected Node 22.23.3 failed Astro’s minimum-version check during the first deployment attempt; the shared `.nvmrc` now selects a supported LTS major.
