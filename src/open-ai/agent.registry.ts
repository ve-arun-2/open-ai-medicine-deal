import { Injectable } from '@nestjs/common';
import { Agent } from '@openai/agents';
import { MedicineService } from './medicine.service'

@Injectable()
export class AgentRegistry {

    constructor(private readonly medicineService: MedicineService) { }

    getAgent(type: string): Agent {

        switch (type) {
            case 'medicine':
                return this.medicineService.getMedicineAgent();

            default:
                throw new Error('Unknown agent');
        }
    }
}