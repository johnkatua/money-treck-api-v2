import { Response } from "express";
import { CustomRequest } from "../middleware/auth";
import { IExpenditure } from "../interface/expenditure";
import { createExpenditure, getExpenditures } from "../controllers/expenditure";

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