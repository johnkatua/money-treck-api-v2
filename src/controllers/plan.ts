import { Request, Response } from "express"
import Plan from "../models/plan"

export const createPlan = async (req: Request, res: Response) => {
    try {
        const plan = await Plan.create(req.body)
        res.status(201).json({
            data: plan,
            msg: 'Plan created successfully'
        })
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : "Unknown error"
        res.status(500).json({
            msg: errMsg
        })
    }
}