import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { OpenAiModule } from './open-ai/open-ai.module';
import { FdaMedicineModule } from './fda-medicine/fda-medicine.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,   // ✅ available everywhere
      envFilePath: '.env',
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/shopdb-local'),
    UsersModule,
    OpenAiModule,
    FdaMedicineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
