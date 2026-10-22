---
title: 'Evaluating an alternative iOS camera-mode selector'
shortTitle: 'iOS camera-interface study'
summary: 'A human–computer interaction study moving from observation and survey evidence to prototype comparison and quantitative evaluation.'
date: '2024-11-04'
categories: ['Research & evaluation', 'Systems & interfaces']
methods: ['User research', 'Quantitative UX', 'Figma']
order: 3
context: 'Human–computer interaction course project · Georgia Tech'
contribution: 'Needfinding, survey design, interface alternatives, prototyping, and evaluation.'
finding: 'Six final-stage participants rated the grid prototype more efficient and intuitive; visual appeal remained an unresolved tradeoff.'
artifacts:
  [
    { 'label': 'Read the study', 'href': '/projects/ios-camera-prototype/paper.pdf' },
    {
      'label': 'Open Figma prototype',
      'href': 'https://www.figma.com/proto/BnU5m8xvTo40yhVUYqnlWP/iPhone-Grid-Menu-Prototype',
    },
  ]
---

## The question

When someone opens a camera, the interface should help them capture the moment. I investigated whether iOS camera-mode selection made that harder than necessary, then designed and evaluated an alternative.

## From observations to a design decision

Needfinding combined observation, a survey of 28 people, and heuristic analysis. In the survey, 85% reported having captured media in the wrong mode, and 78% reported missing an opportunity because of difficulties switching modes. These are respondents’ reports, not measured error rates.

I considered more than 30 design alternatives and prototyped a grid, a drop-down, and a wheel. Initial evaluation led me to develop the grid in Figma: it exposed the available modes at once and allowed direct selection.

## The prototype

The grid uses larger targets and visible options. A persistent indicator communicates the current mode. Feedback about thumb reach informed the placement of frequently used modes toward the bottom.

![The original Figma camera-mode prototype, showing a grid with Photo at the bottom.](/projects/ios-camera-prototype/thumbnail.png)

## Evaluation and tradeoffs

Six participants, recruited from friends and family, took part in the final live demonstration and rated both interfaces. Mean perceived efficiency rose from 3.00 to 4.66, and intuitiveness from 3.67 to 4.83, on five-point scales. The report gives p = 0.011 and p = 0.00092 for those comparisons.

All six preferred the prototype overall. However, its visual-appeal rating was lower, with no statistically significant difference reported. Participants also raised reachability and aesthetic concerns. Those findings identify the next design questions rather than a finished production solution.

## Limits

The final sample was small and recruited through personal connections. The results measure **perceived efficiency and intuitiveness**, not verified reductions in task time or errors. They provide formative evidence for further testing, not a population-wide estimate of user preference.

## What I would test next

A larger, more diverse sample and instrumented tasks would help distinguish preference from performance. I would compare completion time, wrong-mode selections, and one-handed reachability while refining visual integration with the existing camera interface.
