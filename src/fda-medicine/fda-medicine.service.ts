import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FdaMedicine } from '../schema/fda_medicines.schema';

@Injectable()
export class FdaMedicineService {
    constructor(
        @InjectModel(FdaMedicine.name)
        private medicineModel: Model<FdaMedicine>
    ) { }

    async findByParameters(params: Record<string, string>) {
        return await this.medicineModel.find(params);
    }
}
