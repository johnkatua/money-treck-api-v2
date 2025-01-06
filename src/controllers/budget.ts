import { IBudget } from "../interface/budget";
import BudgetModel from "../models/budget";

export const createBudget = async (budgetData: Partial<IBudget>) => {
  try {
    const data = await BudgetModel.create(budgetData)
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}

export const getBudgets = async () => {
  try {
    const data = await BudgetModel.find();
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}