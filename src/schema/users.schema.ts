import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class Users {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, select: false })
  email: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true })
  city: string;

  @Prop({select: false})
  createdAt: Date

  @Prop({select: false})
  updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(Users);