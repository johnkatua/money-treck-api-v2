import { Response } from "express";
import { createRevenue } from "../controllers/revenue";
import { IRevenue } from "../interface/revenue";
import { CustomRequest } from "../middleware/auth";

export const create = async (req: CustomRequest, res: Response) => {
  try {
    const { name, amount, period } = req.body;
    const user_id = req.user?._id;
  
    const revenueData: Partial<IRevenue> = {
      name, amount, period, user_id
    }

    const data = await createRevenue(revenueData)

    res.status(201).json({
      msg: "Revenue created successfully",
      data
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: "Failed to create revenue",
      error: errorMessage
    })
  }
}