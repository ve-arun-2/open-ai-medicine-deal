import { Injectable } from '@nestjs/common';
import { FdaMedicineService } from "../fda-medicine/fda-medicine.service";
import { createGetMedicineByNameTool } from './tools/get-medicine-details-by-name.tool'
import { filterMedicineByDosageIngredients } from './tools/filter-medicine-by-ingredients.tool'

@Injectable()
export class ToolRegistry {
    constructor(private fdaService: FdaMedicineService) { }

    getTools() {
        return [
            createGetMedicineByNameTool(this.fdaService),
            filterMedicineByDosageIngredients(this.fdaService),
        ];
    }
}