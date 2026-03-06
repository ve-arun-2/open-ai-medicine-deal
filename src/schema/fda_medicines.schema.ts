import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ strict: false, collection: 'fda_medicines' })
export class FdaMedicine {}

export const FdaMedicineSchema = SchemaFactory.createForClass(FdaMedicine);