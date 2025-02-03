import { Response } from "express";
import { createRevenue, getRevenues } from "../controllers/revenue";
import { IRevenue } from "../interface/revenue";
import { CustomRequest } from "../middleware/auth";

export const create = async (req: CustomRequest, res: Response) => {
  try {
    const { name, amount, period } = req.body;
    const user_id = req.user?._id;
  
    const revenueData: Partial<IRevenue> = {
      name, amount, period, user_id
    }

    const { data, success, error } = await createRevenue(revenueData)

    if (!success) {
      res.status(400).json({
        msg: error,
        data
      })
    };

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

export const getAll = async (req: CustomRequest, res: Response) => {
  try {
    const data = await getRevenues()

    console.log({ data })

    res.status(200).json({
      msg: "Revenues fetched successfully!",
      data
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: "Failed to fetch revenues",
      error: errorMessage
    })
  }
}