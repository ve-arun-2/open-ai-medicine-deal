import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../schema/users.schema.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) 
    private userModel: Model<Users>
  ) {}

  create(user: Partial<Users>) {
    return this.userModel.create(user);
  }

  findAll() {
    return this.userModel.find();
  }
}
