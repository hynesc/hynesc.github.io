---
title: 'A simpler model with the same measured F1'
shortTitle: 'Telco churn modeling'
summary: 'An end-to-end classification workflow that pairs interpretable modeling with an interactive demonstration.'
date: '2025-07-14'
categories: ['Data & ML', 'Systems & interfaces']
methods: ['scikit-learn', 'Feature selection', 'Streamlit']
order: 9
context: 'Independent modeling project'
contribution: 'Data cleaning, preprocessing pipeline, logistic regression, feature selection, and application.'
finding: 'Removing three weak features retained the reported F1 score of 0.61 in this project’s evaluation.'
artifacts:
  [
    { 'label': 'Open application', 'href': 'https://telco-churn-analysis.streamlit.app/' },
    { 'label': 'Source on GitHub', 'href': 'https://github.com/hynesc/telco-churn' },
    { 'label': 'Download notebook', 'href': '/projects/telco-churn/notebook.ipynb' },
  ]
---

## The problem

I used the Telco churn dataset to build a complete workflow from raw customer records to an interactive prediction interface.

## Approach

The preprocessing pipeline converts numeric fields, removes rows with missing total charges, drops the customer identifier, scales numeric variables, and one-hot encodes categorical features. Logistic regression provides an interpretable baseline.

Coefficient analysis motivated removing gender, phone-service status, and partner status. The smaller model retained the reported F1 score of 0.61 and became the application’s model.

## What the application demonstrates

Users can change customer attributes and inspect a prediction. This connects modeling decisions to a tangible interface, while keeping the underlying preprocessing consistent.

## Limits

The result belongs to this dataset and evaluation. Model probabilities are not independently established as calibrated confidence, and predictions do not identify which intervention would prevent churn. Prospective evaluation and intervention design would be required for an operational retention program.
