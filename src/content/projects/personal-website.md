---
title: 'Building this portfolio with Astro'
shortTitle: 'This portfolio'
summary: 'An Astro portfolio with searchable projects, interactive results, and supporting papers and notebooks.'
date: '2026-10-22'
categories: ['Systems & interfaces']
methods: ['Astro', 'TypeScript', 'GitHub Pages']
order: 11
context: 'Independent website project'
contribution: 'Content architecture, editorial case studies, design system, interactive figures, and static deployment.'
finding: 'Static pages support quick project browsing and detailed review of methods, results, and source material.'
artifacts: [{ 'label': 'Source on GitHub', 'href': 'https://github.com/hynesc/hynesc.github.io' }]
---

## The design problem

A portfolio has two reading speeds. A hiring reader needs to understand the work quickly; a technical reader needs enough detail to assess it. I rebuilt this site to support both, using questions and evidence as the organizing structure.

## Implementation

Astro generates static HTML from typed Markdown content collections. Shared layouts provide consistent navigation, project metadata, artifact links, and typography. Small browser scripts enhance the project index and readmission-results figure; core content remains available without JavaScript.

The figure uses reported aggregate results and a fixed scale for each metric, with a complete table as an accessible alternative. System diagrams and chart labels use HTML text so they remain readable on small screens.

## Deployment and maintenance

Astro builds the site directly, using directory routes and a generated sitemap. A few built-in static redirects handle previously shared page addresses. Project papers and notebooks are ordinary downloads in the public directory.

GitHub Actions checks content, types, links, navigation, and accessibility before deploying the static output to GitHub Pages.
