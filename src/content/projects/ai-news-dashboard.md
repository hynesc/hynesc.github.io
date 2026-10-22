---
title: 'Following the conversation around AI governance'
shortTitle: 'AI governance news tracker'
summary: 'A scheduled collection pipeline and interactive dashboard for exploring AI safety and policy coverage.'
date: '2025-07-25'
categories: ['Data & ML', 'Systems & interfaces']
methods: ['NLP', 'Data pipelines', 'Streamlit']
order: 8
context: 'Independent data application'
contribution: 'News collection, sentiment and phrase analysis, scheduled automation, and interactive dashboard.'
finding: 'A browsable record of coverage and recurring phrases, with clear limits from source selection and article snippets.'
artifacts:
  [
    { 'label': 'Open application', 'href': 'https://ai-news-dashboard.streamlit.app/' },
    { 'label': 'Source on GitHub', 'href': 'https://github.com/hynesc/ai-news-dashboard' },
  ]
---

## The question

Which AI safety and governance topics appear in news coverage, and how does that coverage change? I built a pipeline that collects relevant articles and makes the resulting data explorable.

## From collection to interface

GitHub Actions schedules a daily NewsAPI collection job. The pipeline deduplicates articles and appends records to a version-controlled CSV. VADER sentiment scores and frequent bigrams/trigrams provide lightweight summaries.

A Streamlit interface uses Plotly charts, date filters, and concept selection to connect aggregate patterns back to the articles that generated them.

## Interpretation and limits

The dataset reflects a particular query and source collection, not all public discourse. Sentiment scores are lexicon-based estimates and can miss context, irony, and policy nuance. The API tier supplies snippets rather than complete articles. Frequent phrases are descriptive signals, not validated topic labels.

The implementation demonstrates an automated data product; the external application and feed depend on hosting availability and API access. Full-text collection and more careful topic validation would be useful extensions.
