import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FdaMedicineService } from './fda-medicine.service';
import { FdaMedicine, FdaMedicineSchema } from '../schema/fda_medicines.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FdaMedicine.name, schema: FdaMedicineSchema }
    ]),
  ],
  providers: [FdaMedicineService],
  exports: [FdaMedicineService],
})
export class FdaMedicineModule { }
