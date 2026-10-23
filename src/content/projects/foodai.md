---
title: 'FoodAI: pantry management and recipe ideas'
shortTitle: 'FoodAI'
summary: 'A personal cooking app for managing pantry ingredients, shopping lists, and recipe ideas, built with AI coding tools.'
date: '2026-02-12'
categories: ['Systems & interfaces']
methods: ['TypeScript', 'Next.js', 'PostgreSQL', 'Prisma', 'LLM integration']
order: 5.5
context: 'Personal software project · AI-assisted development'
contribution: 'Ingredient workflows, accounts, persistent data, and recipe-provider integration, developed with AI coding tools.'
finding: 'A prototype connecting stored ingredients and saved preferences to recipe suggestions.'
artifactNote: 'Local prototype. Source and setup instructions are available on GitHub.'
artifacts:
  [
    { label: 'Source on GitHub', href: 'https://github.com/hynesc/ai-recipes' },
    { label: 'Setup guide', href: 'https://github.com/hynesc/ai-recipes#local-setup' },
  ]
---

## A personal cooking project

I made FoodAI for fun, using AI coding tools to build a pantry, shopping list, and recipe interface in one application.

<figure>
  <a href="/projects/foodai/preview.png" aria-label="View full-size FoodAI screenshot">
    <img src="/projects/foodai/preview.png" width="1280" height="1068" alt="FoodAI pantry view with example ingredients, storage locations, use-by estimates, and shopping-list controls." loading="lazy" />
  </a>
  <figcaption>Local pantry view with example ingredients. Select the image to view it full size.</figcaption>
</figure>

## What it does

- Tracks ingredients in pantry, fridge, or freezer storage, with estimated use-by dates and manual overrides.
- Moves ingredients between the shopping list and pantry, and records when items are used up.
- Suggests recipes from available ingredients, saved dietary preferences, and an optional request, then expands suggestions into recipe cards.

## Implementation and scope

The app uses Next.js and TypeScript, account sign-in, and Prisma with PostgreSQL for persistent data. A recipe-provider interface supports OpenAI, Gemini, and a built-in mock fallback. Shelf-life estimates come from an ingredient catalog and fallback rules.

This is a personal prototype. Local verification uses the mock recipe provider; it does not establish the quality of live model-generated recipes.
