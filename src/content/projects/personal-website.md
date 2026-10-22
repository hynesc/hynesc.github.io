---
title: 'Building this portfolio with Astro'
shortTitle: 'This portfolio'
summary: 'A custom static site that brings research, software, and decision-making into one accessible editorial experience.'
date: '2026-10-22'
categories: ['Systems & interfaces']
methods: ['Astro', 'TypeScript', 'GitHub Pages']
order: 11
context: 'Independent website project'
contribution: 'Content architecture, editorial case studies, design system, interactive figures, and static deployment.'
finding: 'A research-first reading experience with accessible evidence, preserved artifacts, and a lightweight static frontend.'
artifacts: [{ 'label': 'Source on GitHub', 'href': 'https://github.com/hynesc/hynesc.github.io' }]
---

## The design problem

A portfolio has two reading speeds. A hiring reader needs to understand the work quickly; a technical reader needs enough detail to assess it. I rebuilt this site to support both, using questions and evidence as the organizing structure.

## Implementation

Astro generates static HTML from typed Markdown content collections. Shared layouts provide consistent navigation, project metadata, artifact links, and typography. Small browser scripts enhance the project index and readmission-results figure; core content remains available without JavaScript.

The figure uses reported aggregate results and a fixed scale for each metric, with a complete table as an accessible alternative. Custom SVG diagrams explain system architecture without loading a client-side diagram renderer.

## Migration and maintenance

The previous site used Quarto. This rebuild keeps its public page and download URLs, papers, notebooks, and thesis code page while moving presentation into Astro. GitHub Actions builds and validates the site, and GitHub Pages serves the static output at the existing domain.

The content and research artifacts remain version controlled. Build checks, link validation, accessibility checks, and browser tests make future edits easier to review.
