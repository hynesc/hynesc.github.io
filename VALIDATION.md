# Implementation validation

Validated locally on 2026-10-22 against the production static build. Branch: `codex/empirical-portfolio`, based directly on `main` at `038da37`.

## Checks

- Astro/TypeScript: 0 errors, warnings, or hints.
- Production build: 17 HTML pages, including 11 project case studies.
- Internal-link validation: all local links, fragment targets, legacy HTML files, domain file, and referenced downloads pass.
- Playwright: 26 passing tests across desktop Chrome and mobile Chromium. Covers navigation, filtering and empty results, figure state and fixed scales, accessibility, overflow, and no-JavaScript content.
- Original artifacts: all 29 files moved into `public` match their `main` versions byte-for-byte.
- Thesis code: all 23 original R code blocks are unchanged. Markdown heading levels were adjusted for the new page hierarchy.
- Production dependency audit: no known vulnerabilities reported.

## Mobile Lighthouse

Local production output, simulated mobile defaults. Results are measurements of this build, not guarantees about every device or network.

| Page                   | Performance | Accessibility | Best practices | SEO | CLS |
| ---------------------- | ----------: | ------------: | -------------: | --: | --: |
| Homepage               |          98 |           100 |            100 | 100 |   0 |
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

Review artifacts are ignored by Git. The original PDF reports and résumé remain unchanged. Model experiments were not rerun; reported results were checked against the existing portfolio and supporting reports, including visual verification of the readmission tables.

## Publication

The workflow is prepared to validate pull requests and deploy only from `main`. This implementation has not been merged, pushed, or deployed. GitHub Pages and the existing custom domain remain the intended production host.
