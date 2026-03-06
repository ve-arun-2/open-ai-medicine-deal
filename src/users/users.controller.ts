import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AiExecutor } from '../open-ai/ai-executor'

@Controller('users')
export class UsersController {

  constructor(
    private readonly userService: UsersService,
    private readonly aiExecutor: AiExecutor,
  ) { }

  @Post()
  async createUser(@Body() body: any) {
    return await this.userService.create(body);
  }

  @Get()
  async getUserList() {
    return await this.userService.findAll();
  }

  @Post('medicine')
  async callMyAiAgent(@Body('query') query: string) {
    try {
      const medicineInfo = await this.aiExecutor.execute(query)

      return medicineInfo
    } catch (error) {
      throw error
    }

  }
}

