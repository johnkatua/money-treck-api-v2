import { Response } from "express";
import { CustomRequest } from "../middleware/auth";
import { IBudget } from "../interface/budget";
import { createBudget, getBudgets } from "../controllers/budget";

export const create = async (req: CustomRequest, res: Response) => {
  try {
    const { name, amount, period } = req.body;
    const user_id = req.user?._id; // user_id retrieved from auth token

    const budgetData: Partial<IBudget> = {
      name, amount, period, user_id
    }

    const data = await createBudget(budgetData);

    res.status(201).json({
      msg: "Budget created successfully",
      data
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: "Failed to create budget",
      error: errorMessage
    })
  }
}

export const getAll = async (req: CustomRequest, res: Response) => {
  try {
    const data = await getBudgets();

    res.status(200).json({
      msg: "Budgets fetched successfully!",
      data
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: "Failed to fetch budgets",
      error: errorMessage
    })
  }
}