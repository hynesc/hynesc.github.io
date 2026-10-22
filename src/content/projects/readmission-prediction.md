---
title: 'When does a better model actually perform better?'
shortTitle: 'Revisiting neural readmission models'
summary: 'A replication study of a published neural architecture, and an investigation into what changes when its configuration does.'
date: '2025-04-20'
categories: ['Research & evaluation', 'Data & ML']
methods: ['PyTorch', 'Replication', 'Statistical testing']
order: 1
context: 'Graduate research project · Georgia Tech · with Felipe Oliveira'
contribution: 'Preprocessing, GRU baseline, embeddings, tuning experiments, statistical evaluation, and co-authorship.'
finding: 'In our synthetic-data experiments, the model’s advantage emerged after tuning; it was not evident under the initial configuration.'
artifacts:
  [
    { 'label': 'Read the paper', 'href': '/projects/readmission-prediction/paper.pdf' },
    { 'label': 'Source on GitHub', 'href': 'https://github.com/hynesc/readmission-prediction' },
    { 'label': 'Download notebook', 'href': '/projects/readmission-prediction/notebook.ipynb' },
  ]
---

## The question

Does adding long-term patient context to a sequential neural model improve hospital-readmission prediction—and can that advantage be reproduced?

Felipe Oliveira and I revisited the CONTENT architecture from [Xiao et al. (2018)](https://doi.org/10.1371/journal.pone.0195024). The task was to translate an older Theano implementation into PyTorch, compare it with a GRU baseline, and examine how much the conclusions depended on training choices.

## My contribution

I implemented preprocessing and evaluation functionality, the GRU baseline, and support for that baseline throughout the experiment pipeline. I trained Word2Vec embeddings, tested architectural variations, conducted tuning experiments using Felipe’s grid-search implementation, ran the tuned 30-trial experiments, and performed statistical comparisons. I also wrote substantial sections of our report.

Felipe implemented CONTENT, the training loop, the grid-search module, and the initial 30-trial runs, alongside other infrastructure and writing contributions. The paper contains our full contribution statements.

## Experimental design

We used the original authors’ publicly available synthetic dataset: 3,000 patients, split into 2,000 training, 500 validation, and 500 test patients. The real clinical dataset was unavailable. CONTENT combines a sequential GRU with a topic-based representation of patient history; the GRU baseline isolates the value of that added context.

We prioritized precision–recall AUC and reported ROC-AUC alongside it. After observing rising validation loss beyond the second epoch, we used two training epochs and 30 trials per configuration. The original paper used six epochs and ten trials, so this is a replication with documented changes, not an identical rerun.

## What the evidence showed

Under the initial hyperparameters, mean PR-AUC was 0.6391 for CONTENT and 0.6401 for GRU. Our analysis found no statistically significant CONTENT advantage. After validation-based tuning, the reported means were 0.6464 and 0.6391 respectively; the report’s comparison gives p < 0.0001.

The absolute improvement is modest. The useful finding is that the architecture’s measured advantage depends on configuration. Trying alternative layers and activations did not automatically improve results.

## Limits and interpretation

These results concern synthetic data and our implementation. Framework differences, unavailable original embeddings, dataset-version uncertainty, and incomplete baseline specifications limit direct comparisons with the published study. Repeated training runs measure variation in this setup; they do not establish generalization to new hospitals or clinical usefulness.

The interactive figure reproduces the aggregate values in Tables I and II of our report. Error bars show **standard deviations across trials**, not confidence intervals. Statistical conclusions come from the report’s tests, not visual inspection of overlapping bars.

## Why this work matters

A research result becomes more useful when its conditions are explicit. This project combined implementation, controlled comparison, and careful interpretation to identify when a reported advantage appears—and where the evidence stops.
