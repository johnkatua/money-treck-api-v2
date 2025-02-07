import { Response } from "express";
import { CustomRequest } from "../middleware/auth";
import { IBudget } from "../interface/budget";
import { createBudget, getBudgetById, getBudgets, updateBudget } from "../controllers/budget";

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

export const getById = async (req: CustomRequest, res: Response): Promise<any> => {
  const { id } = req.body;
  try {
    const data = await getBudgetById(id)

    if (!data) {
      return res.status(404).json({
        msg: `Budget with ${id} not found`,
        data
      })
    }

    res.status(200).json({
      msg: `Budget with id ${id} fetched successfully`,
      data
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: `Failed to fetch budget with an id of ${id}`,
      error: errorMessage
    })
  }
}

export const updateBudgetService = async (req: CustomRequest, res: Response) => {
  try {
    const { name, amount, period, _id } = req.body;
    const user_id = req.user?._id; // user_id retrieved from auth token

    const budgetData: Partial<IBudget> = {
      name, amount, period, user_id, _id
    }

    const data = await updateBudget(budgetData);

    res.status(200).json({
      msg: "Budget updated successfully",
      data
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: "Failed to update budget",
      error: errorMessage
    })
  }
}