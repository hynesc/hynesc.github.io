---
title: 'A strong baseline for movie-review sentiment'
shortTitle: 'IMDb sentiment analysis'
summary: 'A text-classification pipeline using TF-IDF and logistic regression, with a public interface for exploring predictions.'
date: '2025-07-12'
categories: ['Data & ML', 'Systems & interfaces']
methods: ['NLP', 'TF-IDF', 'scikit-learn']
order: 10
context: 'Independent modeling project'
contribution: 'Text preprocessing, model tuning, held-out evaluation, and Streamlit interface.'
finding: 'Approximately 90.8% held-out accuracy with a comparatively simple text-classification pipeline.'
artifacts:
  [
    { 'label': 'Open application', 'href': 'https://imdb-sentiment-prediction.streamlit.app/' },
    { 'label': 'Source on GitHub', 'href': 'https://github.com/hynesc/imdb-sentiment' },
    { 'label': 'Download notebook', 'href': '/projects/imdb-sentiment/notebook.ipynb' },
  ]
---

## The question

How far can a straightforward statistical text model go on sentiment classification? I built a TF-IDF and logistic-regression pipeline on the 50,000-review IMDb dataset.

## Method

The project uses an 80/20 training/test split. Grid search tunes the vectorizer’s n-gram range and document-frequency settings alongside the classifier’s regularization. A Streamlit interface accepts review text and displays the resulting class and probability.

## Findings and limits

The project reports approximately 90.8% accuracy on the held-out test set. That supports the baseline’s usefulness on this benchmark; it does not establish accuracy on news, social media, or other domains.

Sarcasm, mixed sentiment, and domain shifts remain limitations. The displayed probability is a model output, not a guarantee of correctness or a separately calibrated confidence estimate.
