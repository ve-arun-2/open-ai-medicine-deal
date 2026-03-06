import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from '../schema/users.schema'
import { OpenAiModule } from '../open-ai/open-ai.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UserSchema }
    ]),
    OpenAiModule
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule { }
