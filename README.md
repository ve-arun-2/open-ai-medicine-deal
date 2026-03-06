# open-ai-medicine-deal
My open ai agent deal with FDA medicine details

## AI Agent Executor (Medicine Assistant)

This project implements an AI-powered medicine assistant using an Agent + Tool architecture.

The system routes user queries to an AI agent which can call internal tools to retrieve medicine information. Input is validated through guardrails before being processed.

## Architecture Overview

```
User Query
    │
    ▼
Controller
    │
    ▼
AIExecutor
    │
    ├── InputGuardrail (Security & validation)
    │
    ├── Router / Agent Selection
    │
    ▼
Agent
    │
    ├── ToolRegistry
    │
    ▼
Tools
    │
    ▼
External Services / Database

```

## Agentic Ai Work Flow
```
                 ┌──────────────────┐
User Input ─────►│ Input Guardrail  │
                 └────────┬─────────┘
                          │
                          ▼
                 ┌──────────────────┐
                 │ Agent Router     │
                 └────────┬─────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
 MedicineAgent      BillingAgent      DealerAgent
        │                 │
        ▼                 ▼
      Tools             Tools
        │
        ▼
                 ┌──────────────────┐
                 │ Output Guardrail │
                 └────────┬─────────┘
                          ▼
                      Final Answer
```