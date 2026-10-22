---
title: 'A local language model, in an everyday conversation'
shortTitle: 'Signal Assistant'
summary: 'A self-hosted messaging assistant that handles conversation state, concurrent inference, and the practical constraints of a shared transport.'
date: '2026-05-01'
categories: ['Data & ML', 'Systems & interfaces']
methods: ['Python', 'Ollama', 'Docker']
order: 5
context: 'Independent software project'
contribution: 'Message routing, conversation state, concurrency controls, model integration, configuration, and testing.'
finding: 'Local inference becomes usable through explicit state management, bounded concurrency, and operational controls.'
artifacts:
  [
    { 'label': 'Source on GitHub', 'href': 'https://github.com/hynesc/signal-assistant' },
    {
      'label': 'Setup guide',
      'href': 'https://github.com/hynesc/signal-assistant/blob/main/SETUP.md',
    },
    {
      'label': 'Read the implementation',
      'href': 'https://github.com/hynesc/signal-assistant/blob/main/signal_bot/bot.py',
    },
  ]
---

## The problem

Connecting a model to messaging is only the beginning. Conversations need ordering, bounded memory, configurable behavior, and a transport that does not compete with itself. I built this assistant to explore those practical requirements with local Ollama inference.

## Architecture

A Python application receives and sends messages using Signal CLI inside Docker. The container’s REST interface handles account setup; normal message transport uses the CLI directly. Requests go to Ollama’s native chat endpoint with the appropriate conversation history and persona.

Direct messages can trigger replies immediately. Groups use mentions or command prefixes. The public edition supplies a neutral persona and fictional example contacts; operators provide their own account and endpoint.

## Engineering choices

Separate transport and inference interfaces make conversation logic testable without a live account. Worker threads accommodate blocking CLI calls. A shared transport lock coordinates account access, per-conversation locks preserve ordering, and a semaphore bounds inference concurrency.

History stays in memory, older exchanges are summarized, and idle state expires. Administrator commands control model settings and mute behavior. Routine incoming-message logs omit message text and sender/group identifiers.

## Validation and limits

The public implementation documents 17 automated tests spanning routing, settings, expiry, configuration, search parsing, sanitization, cleanup, and persona loading. Fake clients and temporary fixtures isolate behavior from live services.

Local inference gives the operator control over the model endpoint, but the bot host still handles decrypted messages. Optional web searches send queries to DuckDuckGo. Cleanup is best-effort and does not guarantee secure erasure. Live operation requires an operator-provided account and model server.

## What this demonstrates

The interesting work sits between the model and the user: translating transport constraints into predictable behavior, making concurrency explicit, and keeping the system inspectable and configurable.
