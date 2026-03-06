import { Injectable } from '@nestjs/common';
import { Agent } from '@openai/agents';
import { ToolRegistry } from './open-ai-tool.registry'

@Injectable()
export class MedicineService {
    private readonly mainAgent: Agent

    constructor(private toolRegistry: ToolRegistry) {
        this.mainAgent = new Agent({
            name: 'MedicineAgent',
            model: 'gpt-4o-mini',

            instructions: `You are an FDA pharmaceutical data assistant.

            Capabilities:
            - Answer medicine questions only.
            - Use tools to fetch ALL medicine data.

            Language:
            - Detect user's language automatically.
            - Respond ONLY in English.
            - Reject other languages politely.

            Safety:
            - Never invent information.
            - If no data → "No record found".
            `,

            tools: this.toolRegistry.getTools(),
        });
    }

    getMedicineAgent(): Agent {
        return this.mainAgent
    }

}
