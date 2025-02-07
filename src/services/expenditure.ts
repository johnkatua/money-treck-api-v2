import { Response } from "express";
import { CustomRequest } from "../middleware/auth";
import { IExpenditure } from "../interface/expenditure";
import { createExpenditure, deleteExpenditure, getExpenditures, updateExpenditure } from "../controllers/expenditure";

export const create = async (req: CustomRequest, res: Response) => {
  try {
    const { name, amount, budget_id } = req.body;
    const user_id = req.user?._id; // user_id retrieved from auth token

    const expenditureData: Partial<IExpenditure> = {
      name, amount, budget_id, user_id
    }

    const data = await createExpenditure(expenditureData);

    res.status(201).json({
      msg: "Expenditure created successfully",
      data
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: "Failed to create expenditure",
      error: errorMessage
    })
  }
}

export const getAll = async (req: CustomRequest, res: Response) => {
  try {
    const data = await getExpenditures();

    res.status(200).json({
      msg: "Expenditures fetched successfully!",
      data
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: "Failed to fetch expenditures",
      error: errorMessage
    })
  }
}

export const updateExpenditureService = async (req: CustomRequest, res: Response) => {
  try {
    const { name, amount, budget_id, id } = req.body;
    const user_id = req.user?._id; // user_id retrieved from auth token

    const expenditureData: Partial<IExpenditure> = {
      name, amount, budget_id, user_id
    }

    const data = await updateExpenditure(expenditureData);

    res.status(201).json({
      msg: "Expenditure updated successfully",
      data
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: "Failed to update expenditure",
      error: errorMessage
    })
  }
}

export const deleteExpenditureService = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;

    const data = await deleteExpenditure(id)

    if (!data) {
      return res.status(404).json({
        msg: "Expenditure not found"
      })
    }

    res.status(200).json({
      msg: "Expenditure deleted",
      data
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: "Failed to delete expenditure",
      error: errorMessage
    })
  }
}