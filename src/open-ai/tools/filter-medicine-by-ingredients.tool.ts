import { tool } from "@openai/agents";
import { z } from "zod";
import { FdaMedicineService } from "../../fda-medicine/fda-medicine.service";

export function filterMedicineByDosageIngredients(fdaMedicineService: FdaMedicineService) {

    return tool({
        name: "filter_medicine_based_on_type_ingredients",
        description: "Filter medicines by dosage type, ingredients",
        parameters: z.object({
            dosage_type: z.string().describe(`Allowed medical dosage forms ONLY.
                                        Examples: tablet, capsule, syrup, injection.
                                        Never use words like "any" or "all".`),
            ingredients: z.string()
        }),
        execute: async ({ dosage_type, ingredients }) => {
            console.log("TOOL: Filter By Ingredients Calling==>>>>")
            let queryParams = {}
            if (dosage_type) {
                queryParams['dosage_form'] = { "$regex": dosage_type, "$options": "i" }
            }
            if (ingredients) {
                queryParams['active_ingredients'] = { $elemMatch: { name: { "$regex": ingredients, "$options": "i" } } }
            }
            console.log("queryParams :", JSON.stringify(queryParams))
            const medicineInfo: Record<string, any> = await fdaMedicineService.findByParameters(queryParams)
            console.log("Total :", medicineInfo.length)
            if (!medicineInfo.length) {
                return "No record found"
            }
            return medicineInfo;
        },
    })
}