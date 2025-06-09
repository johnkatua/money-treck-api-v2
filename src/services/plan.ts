import Plan from "../models/plan"

export const getPlan = async (plan_id: string) => {
    try {
        const plan = await Plan.findById(plan_id)
        return plan
    } catch (error) {
        return error
    }
}