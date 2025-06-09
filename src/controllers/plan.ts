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

export const getAllPlans = async (_req: Request, res: Response) => {
    try {
        const plans = await Plan.find();
        res.status(200).json({
            data: plans
        })
    } catch (error) {
        const errMsg = errorHandler(error)
        res.status(500).json({
            msg: errMsg
        })
    }
}

export const getPlanById = async (req: Request, res: Response) => {
    try {
        const plan = await Plan.findById(req.params.id);
        if (!plan) return res.status(404).json({
            msg: 'Plan not found'
        })
        res.status(200).json({
            data: plan
        })
    } catch (error) {
        const errMsg = errorHandler(error);
        res.status(500).json({
            msg: errMsg
        })
    }
}