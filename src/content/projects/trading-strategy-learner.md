---
title: 'Building a trading strategy—and testing where it breaks'
shortTitle: 'Learning a trading strategy'
summary: 'A from-scratch bagged random-tree learner and market simulator, evaluated against manual and buy-and-hold strategies.'
date: '2024-04-14'
categories: ['Data & ML', 'Research & evaluation']
methods: ['Python', 'Ensemble learning', 'Backtesting']
order: 7
context: 'Machine Learning for Trading course project · Georgia Tech'
contribution: 'Tree learners, bagging, indicators, market simulator, strategy design, and comparative evaluation.'
finding: 'The project exposed the difficulty of translating in-sample performance into robust out-of-sample behavior.'
artifacts: [{ 'label': 'Read the report', 'href': '/projects/trading-strategy-learner/paper.pdf' }]
---

## The question

Can a strategy learned from historical market indicators hold up outside its training period? I built the core components myself to examine both model behavior and the assumptions embedded in a backtest.

## Implementation

The system combines a bagged random-tree learner, an indicator engine, and a market simulator. Indicators include Bollinger Bands, relative strength, and a volatility measure. The simulator processes orders and tracks portfolio value.

## Evaluation

I compared the learned strategy with a manually specified strategy and a buy-and-hold benchmark on out-of-sample data. The report documents the experiment and its results. The central lesson was how difficult robust out-of-sample performance can be, even with a functioning end-to-end system.

## Limits and access

Historical backtests do not establish future returns or live trading performance. Source code is restricted by Georgia Tech academic policy and is not published here. The report remains available, and I can discuss the design and implementation.
