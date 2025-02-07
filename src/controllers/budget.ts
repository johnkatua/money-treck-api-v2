import { IBudget } from "../interface/budget";
import BudgetModel from "../models/budget";
import ExpenditureModel from "../models/expenditure";

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

export const getBudgetById = async (id: string) => {
  try {
    const data = await BudgetModel.findById(id);
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}

export const updateBudget = async (budgetData: Partial<IBudget>) => { 
  try {
    const { _id } = budgetData;
    const data = await BudgetModel.findByIdAndUpdate
      (_id, budgetData, { new: true })
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}

export const deleteBudget = async (id: string) => {
  try {
    const data = await BudgetModel.findByIdAndDelete(id)
    // delete entries that reference this budget in expenditures
    await ExpenditureModel.deleteMany({ budget_id: id })
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}