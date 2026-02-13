# Personal Website

This is the source code for my personal website, built with [Quarto](https://quarto.org/) and deployed using [GitHub Actions](https://github.com/features/actions) via [GitHub Pages](https://pages.github.com/).

**Live site:** [https://chynes.org](https://chynes.org)

## Features

- Powered by [Quarto](https://quarto.org/) for modern, reproducible publishing
- Automatically deployed via GitHub Actions
- Compatible with data science workflows (supports `.ipynb`, embedded code, plots, and interactive visualizations)
- Clean, responsive, and mobile-friendly design
- Version-controlled and easy to maintain

## Getting Started

To work with the site locally:

```bash
# Clone the repo
git clone https://github.com/hynesc/hynesc.github.io.git
cd hynesc.github.io

# Preview the site locally
quarto preview
```

To validate content links and metadata:

```bash
./scripts/validate-content.sh
```

To render the site manually:

```bash
quarto render
```

## Deployment

Deployment is handled via **GitHub Actions**. On every push to the `main` branch, the site is rendered and deployed to GitHub Pages.

Make sure:
- GitHub Pages is configured with **Build and deployment source: GitHub Actions**.
- Your GitHub Actions workflow is set up correctly (e.g., `.github/workflows/publish.yml`).

## Project Structure

```
/
├── index.qmd           # Homepage
├── about.qmd           # About section
├── projects.qmd        # Portfolio
├── experience.qmd      # Experience
├── _quarto.yml         # Quarto site configuration
├── assets/             # Static assets
├── scripts/            # Validation helpers
├── styles.css          # Shared site styling
├── .github/workflows/  # GitHub Actions workflow files
└── README.md           # You're here!
```

## Customization

- Edit `.qmd` files to update content
- Tweak `_quarto.yml` to adjust layout, navbar, and theme
- Add styles in `styles.css` for visual customization
