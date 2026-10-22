---
title: 'Customer churn analysis and prediction'
shortTitle: 'Customer retention at GreyNoise'
summary: 'An internship analysis extended into a public predictive-modeling application, with a synthetic dataset for demonstration.'
date: '2025-07-18'
categories: ['Data & ML', 'Systems & interfaces']
methods: ['Logistic regression', 'Cross-validation', 'Streamlit']
order: 6
context: 'Internship analysis · later independent application'
contribution: 'Customer churn and lead analysis in R; subsequent Python modeling and public Streamlit application.'
finding: 'The original-data model achieved mean ROC-AUC 0.70 in stratified five-fold cross-validation; the public demo uses synthetic data.'
artifacts:
  [
    { 'label': 'Open application', 'href': 'https://gn-churn.streamlit.app/' },
    { 'label': 'Source on GitHub', 'href': 'https://github.com/hynesc/gn-churn' },
    { 'label': 'Download notebook', 'href': '/projects/gn-churn/notebook.ipynb' },
  ]
home:
  {
    'title': 'Customer retention at GreyNoise',
    'label': 'GreyNoise / Customer retention',
    'summary': 'Internship analysis of churn and lead conversion, later extended into a public application using synthetic data.',
    'linkLabel': 'Customer-retention project',
  }
---

## The decision context

During my GreyNoise Intelligence internship, I analyzed customer churn and lead origins in R to investigate retention and conversion patterns. I later developed a Python modeling workflow and Streamlit application that made the analysis interactive.

The later public project is distinct from the internship work. Its repository and application use a synthetically generated dataset to protect proprietary information.

## Approach and evidence

The project uses logistic regression and stratified five-fold cross-validation. The original project reports the following means on the proprietary dataset:

| Metric   | Mean score |
| -------- | ---------: |
| Accuracy |       0.79 |
| ROC-AUC  |       0.70 |
| PR-AUC   |       0.54 |

These are historical evaluation results, not metrics measured on the synthetic public demo. Without a disclosed class prevalence, PR-AUC should not be interpreted as a specific improvement over a random baseline.

## Coefficient analysis and application

Coefficient analysis highlighted associations with acquisition source, account history, geography, industry, and recurring revenue. An interactive application makes those relationships easier to explore and discuss than a static model output alone.

These associations are not causal estimates. A useful next step would connect a model to prospective validation and a clearly defined retention intervention, including its costs and consequences.

## Limits

The project does not establish a measured reduction in churn or a production deployment at GreyNoise. The public dataset demonstrates the workflow; it cannot independently reproduce the proprietary-data findings.
