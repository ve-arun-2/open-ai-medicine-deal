import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { FdaMedicineModule } from '../fda-medicine/fda-medicine.module'
import { ToolRegistry } from './open-ai-tool.registry'
import { AiExecutor } from './ai-executor'
import { AgentRouter } from './agent.router'
import { AgentRegistry } from './agent.registry'
import { InputGuardrail } from './guardrails/input-guardrails'

@Module({
  imports: [
    FdaMedicineModule,
  ],
  providers: [MedicineService, ToolRegistry, AiExecutor, AgentRouter, AgentRegistry, InputGuardrail],
  exports: [AiExecutor]
})
export class OpenAiModule { }
