import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): {title: string, message: string}  {
    return {
      title: 'NestJS + MongoDB',
      message: 'Nest started using Docker compose 🚀',
    };
  }
}
