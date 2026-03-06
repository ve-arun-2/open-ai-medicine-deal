import { Injectable } from '@nestjs/common';
import { Agent, run, setDefaultOpenAIKey } from '@openai/agents';

@Injectable()
export class AgentRouter {

  private routerAgent: Agent;

  constructor() {

    this.routerAgent = new Agent({
      name: 'agent_router',
      model: 'gpt-4o-mini',

      instructions: `
      You are an AI router.

      Classify the user query into ONE category:

      - medicine → questions about drugs, dosage, ingredients
      - billing → cost, invoices
      - dealer → location

      Rules:
      - Return ONLY one word.
      - No explanation.
      - Allowed outputs: medicine | billing | dealer
      `
    });
  }

  async route(query: string): Promise<string> {
    const result = await run(this.routerAgent, query);

    if (!result.finalOutput) {
      throw new Error('Router agent did not return any category from user query');
    }
    return result.finalOutput.toLowerCase();
  }
}