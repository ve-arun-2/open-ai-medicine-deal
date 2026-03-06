import { tool } from "@openai/agents";
import { z } from "zod";
import { FdaMedicineService } from "../../fda-medicine/fda-medicine.service";

export function createGetMedicineByNameTool(fdaMedicineService: FdaMedicineService) {

    return tool({
        name: 'get_medicine_details_by_name',
        description: 'Return medicine details based on its medicine/generic name',
        parameters: z.object({
            name: z.string().describe('It is name of medicine'),
        }),
        execute: async ({ name }) => {
            console.log("TOOL: Medicine By Name Calling==>>>>")
            console.log("Medicine Name :===>>>", name)
            const params = { "generic_name": name }
            const medicineInfo: Record<string, any> = await fdaMedicineService.findByParameters(params)
            console.log("Records :", medicineInfo.length)
            if (!medicineInfo.length) {
                return "No record found"
            }
            return medicineInfo;
        },
    });
}