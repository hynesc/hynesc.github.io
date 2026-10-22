# Implementation validation

Validated locally on 2026-10-22 against the production static build. Branch: `codex/empirical-portfolio`, based directly on `main` at `038da37`.

## Checks

- Astro/TypeScript: 0 errors, warnings, or hints.
- Production build: 17 HTML pages, including 11 project case studies.
- Internal-link validation: all local links, fragment targets, legacy HTML files, domain file, and referenced downloads pass.
- Playwright: 26 passing tests across desktop Chrome and mobile Chromium. Covers navigation, filtering and empty results, figure state and fixed scales, accessibility, overflow, and no-JavaScript content.
- Original artifacts: 28 of the 29 files moved into `public` still match their `main` versions byte-for-byte. The résumé was subsequently replaced with the exact PDF from `codex/researcher-portfolio:assets/resume.pdf`.
- Thesis code: all 23 original R code blocks are unchanged. Markdown heading levels were adjusted for the new page hierarchy.
- Production dependency audit: no known vulnerabilities reported.

## Mobile Lighthouse

Local production output, simulated mobile defaults. Results are measurements of this build, not guarantees about every device or network.

| Page                   | Performance | Accessibility | Best practices | SEO | CLS |
| ---------------------- | ----------: | ------------: | -------------: | --: | --: |
| Homepage               |          97 |           100 |            100 | 100 |   0 |
| Readmission case study |          99 |           100 |            100 | 100 |   0 |

Run `npm run audit` to repeat. Detailed reports are in `.review/lighthouse-home.json` and `.review/lighthouse-case.json`.

## Visual review

Inspected the homepage at desktop (1440 px), tablet (820 px), and phone (390 px) widths, along with the case study and mobile work index. Final images are generated with reduced motion and fully loaded fonts. Run `npm run screenshots` to regenerate:

- `.review/home-desktop.png`
- `.review/home-desktop-viewport.png`
- `.review/home-tablet.png`
- `.review/home-mobile.png`
- `.review/figure-mobile.png`
- `.review/case-study.png`
- `.review/work-mobile.png`

Review artifacts are ignored by Git. The original PDF reports remain unchanged. The résumé was updated from `codex/researcher-portfolio:assets/resume.pdf`; coursework and the GreyNoise dashboard description were checked against that document. Model experiments were not rerun; reported results were checked against the existing portfolio and supporting reports, including visual verification of the readmission tables.

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
