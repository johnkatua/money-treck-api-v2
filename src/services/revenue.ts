import { Response } from "express";
import { createRevenue, deleteRevenue, getRevenues, updateRevenue } from "../controllers/revenue";
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
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const data = await getRevenues(page, limit);

    res.status(200).json({
      msg: "Revenues fetched successfully!",
      ...data
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: "Failed to fetch revenues",
      error: errorMessage
    })
  }
}

export const updateRevenueService = async (req: CustomRequest, res: Response) => {
  try {
    const { _id, name, amount, period } = req.body;

    const revenueData: Partial<IRevenue> = {
      _id, name, amount, period
    }

    const data = await updateRevenue(revenueData);

    res.status(200).json({
      msg: "Revenue updated successfully",
      data
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: "Failed to update revenue",
      error: errorMessage
    })
  }
}

export const deleteRevenueService = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;

    const data = await deleteRevenue(id);

    res.status(200).json({
      msg: "Revenue deleted successfully",
      data
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: "Failed to delete revenue",
      error: errorMessage
    })
  }
};