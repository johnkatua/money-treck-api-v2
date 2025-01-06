import { IRevenue } from "../interface/revenue";
import RevenueModel from "../models/revenue";

export const createRevenue = async (revenueData: Partial<IRevenue>) => {
  try {
    const data = await RevenueModel.create(revenueData)
    return { data, success: true } 
  } catch (error) {
    return { data: null, success: false}
  }
}

export const getRevenues = async () => {
  try {
    const data = await RevenueModel.find()
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false }
  }
}