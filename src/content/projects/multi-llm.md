---
title: 'Best-of-N response selection for language models'
shortTitle: 'Multi-LLM'
summary: 'An OpenAI-compatible best-of-N proxy for exploring model pools, response selection, and the engineering tradeoffs between them.'
date: '2026-05-01'
categories: ['Data & ML', 'Systems & interfaces']
methods: ['FastAPI', 'Async Python', 'LLM orchestration']
order: 4
context: 'Independent software project'
contribution: 'API and provider integration, concurrent candidate generation, judge selection, fallbacks, and tests.'
finding: 'A working selection mechanism with explicit partial-failure handling—not a measured claim of improved answer quality.'
artifacts:
  [
    { 'label': 'Source on GitHub', 'href': 'https://github.com/hynesc/multi-llm' },
    {
      'label': 'Configuration guide',
      'href': 'https://github.com/hynesc/multi-llm/blob/main/CONFIGURATION.md',
    },
    {
      'label': 'Read the engine',
      'href': 'https://github.com/hynesc/multi-llm/blob/main/bon_llm/engine.py',
    },
  ]
---

## The question

What does it take to put best-of-N response selection behind a familiar chat interface? I built a proxy that generates several candidates, asks a judge model to select one, and returns the selected answer through an OpenAI-compatible API.

## Implementation

A FastAPI service exposes configurable strategies as model IDs through `/v1/models` and handles chats through `/v1/chat/completions`. A strategy can repeatedly sample one model or distribute candidates across a pool. Candidate requests run concurrently with distinct seeds; a separate judge selects the response.

YAML and environment settings configure providers, model pools, sampling, and credentials. The included Docker Compose setup pairs the proxy with Open WebUI; the model server runs separately.

## Decisions under failure

Successful candidates survive partial upstream failures. A single usable response bypasses judging. Invalid judge output invokes a deterministic fallback, while no usable responses produce an upstream-failure response. Provider interfaces keep orchestration separate from any particular deployment.

Streaming emits the completed winner after selection. It does not provide live tokens while candidate generation is still in progress.

## Validation

The public implementation documents 22 automated tests covering API behavior, SSE responses, selection, fallback, partial and total failures, configuration, and provider URLs. Tests use fake providers rather than live inference. Regression cases ensure missing-information and refusal phrases do not receive blanket fallback penalties.

## Tradeoffs and limits

The system demonstrates the mechanism; it does not establish that best-of-N improves answer quality. A request requires N candidate generations and usually a judge call, with added latency and compute. Judge decisions and fallback heuristics can be wrong. Returned token usage covers the winner, not the strategy’s full cost.

The service is intended for trusted local experiments and has no inbound authentication. A future evaluation would need a defined task set, blinded comparison, and total cost and latency measurement.
