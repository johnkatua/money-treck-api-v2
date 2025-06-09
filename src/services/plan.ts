import { IPlan } from "../interface/plan"
import Plan from "../models/plan"

export const getPlan = async (plan_id: string): Promise<IPlan | any> => {
    try {
        const plan = await Plan.findById(plan_id)
        return plan
    } catch (error) {
        return error
    }
}