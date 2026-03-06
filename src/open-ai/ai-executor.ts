import { Injectable } from '@nestjs/common';
import { run } from '@openai/agents';
import { AgentRouter } from './agent.router';
import { AgentRegistry } from './agent.registry';
import { InputGuardrail } from './guardrails/input-guardrails'
@Injectable()
export class AiExecutor {

    constructor(
        private inputGuardrail: InputGuardrail,
        private router: AgentRouter,
        private registry: AgentRegistry,
    ) { }

    async execute(query: string) {

        try {
            // Step 1 — Guardrail
            await this.inputGuardrail.check(query);


            // Step 2 — Route
            const agentType: string = await this.router.route(query);

            // Step 3 — Get Agent
            const agent = this.registry.getAgent(agentType);

            // Step 4 — Execute Agent
            const result = await run(agent, query);

            return result.finalOutput ?? "No response";
        } catch (error) {
            throw error.message
        }

    }
}