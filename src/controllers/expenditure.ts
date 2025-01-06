import { IExpenditure } from "../interface/expenditure";
import ExpenditureModel from "../models/expenditure";

export const createExpenditure = async (expenditureData: Partial<IExpenditure>) => {
  try {
    const data = await ExpenditureModel.create(expenditureData)
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}

export const getExpenditures = async () => {
  try {
    const data = await ExpenditureModel.find();
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}