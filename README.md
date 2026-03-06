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

### Core Components
1️⃣ AIExecutor

AIExecutor is the central orchestration layer of the AI system.

Responsibilities:

-Validate user input

-Route query to the correct agent

-Execute the agent

-Return the final output
```
export class AIExecutor {

  constructor(
    private inputGuardrail: InputGuardrail,
    private inputGuardrail: InputGuardrail,
    private agentRegistry: AgentRegistry
  ) {}

  async execute(query: string) {

    const safeQuery = this.inputGuardrail.check(query);

    const agentType: string = await this.router.route(safeQuery);

    const agent = this.agentRegistry.getAgent(agentType);

    const result = await run(agent, query);

    return result.finalOutput ?? "No response";
  }
}
```

2️⃣ Agent

- Agents are responsible for understanding the query and deciding which tool to use.

```
export class OpenAiService {

  private readonly mainAgent: Agent;

  constructor(private toolRegistry: ToolRegistry) {

    this.mainAgent = new Agent({
      name: "MedicineAgent",
      model: "gpt-4o-mini",

      instructions: `You are an FDA pharmaceutical data assistant.`,

      tools: this.toolRegistry.getTools()
    });
  }

  getAgent(): Agent {
    return this.mainAgent;
  }
}
```