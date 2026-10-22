---
title: 'What would Chile’s economy have looked like otherwise?'
shortTitle: 'A counterfactual for Chile'
summary: 'An economics honors thesis using synthetic control to investigate the long-run trajectory following Chile’s 1970s reforms.'
date: '2022-05-01'
categories: ['Research & evaluation', 'Data & ML']
methods: ['Causal inference', 'Synthetic control', 'R']
order: 2
context: 'Honors thesis · University of South Carolina'
contribution: 'Research design, World Bank data preparation, synthetic-control analysis, robustness checks, and thesis.'
finding: 'The thesis estimates 2019 GDP per capita 76% above its synthetic counterfactual, with divergence emerging in the early 1990s.'
artifacts:
  [
    { 'label': 'Read the thesis', 'href': '/projects/chile-neoliberal-reforms/paper.pdf' },
    { 'label': 'Explore the R code', 'href': '/projects/chile-neoliberal-reforms/code.html' },
    { 'label': 'Source on GitHub', 'href': 'https://github.com/hynesc/chile-neoliberal-reforms' },
  ]
---

## The question

How might Chile’s economic trajectory have differed without the structural reforms introduced in the 1970s? A before-and-after comparison alone cannot separate reforms from changes affecting the wider region or the world economy.

My undergraduate honors thesis used a synthetic control: a weighted combination of comparison countries selected to approximate Chile’s pre-intervention characteristics and economic trajectory.

## Approach

I assembled World Bank economic and social indicators spanning 1960–2019 and implemented the analysis in R with `Synth`. Pre-treatment fit anchored the counterfactual. I examined alternative donor pools, predictor choices, and placebo comparisons to investigate sensitivity to the design.

![Original thesis figure comparing observed Chilean GDP per capita with its synthetic control, 1960–2019.](/projects/chile-neoliberal-reforms/thumbnail.png)

_Original project figure. Solid: observed Chile; dashed: synthetic control. GDP per capita is shown in 2015 US dollars._

## Findings

The thesis estimates Chile’s 2019 GDP per capita to be 76% above the synthetic counterfactual. The positive divergence appears in the early 1990s, after the transition to democracy, rather than immediately after the reforms.

That timing is central to the interpretation. The estimate describes a long-run comparison under this research design; it does not cleanly isolate the contribution of each reform, political institution, or later policy.

## Identification and limitations

A causal interpretation depends on the donor countries providing a credible untreated trajectory, on the quality of pre-treatment fit, and on the absence of unaccounted-for Chile-specific changes that would explain the later divergence. Spillovers, donor selection, and the long post-treatment period complicate the comparison.

Robustness checks help assess sensitivity but do not eliminate those assumptions. The result is an economic estimate, not a broader assessment of the dictatorship or its human consequences.

## What this demonstrates

The work required turning a broad policy question into an estimable comparison, assembling a cross-country panel, checking alternative specifications, and explaining the boundary between an estimate and its interpretation.
