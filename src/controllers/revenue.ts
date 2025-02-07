import { IRevenue } from "../interface/revenue";
import RevenueModel from "../models/revenue";

export const createRevenue = async (revenueData: Partial<IRevenue>) => {
  try {
    const data = await RevenueModel.create(revenueData)
    return { data, success: true } 
  } catch (error) {
    return { data: null, success: false, error}
  }
}

export const getRevenues = async () => {
  try {
    const data = await RevenueModel.find()
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}

export const updateRevenue = async (revenueData: Partial<IRevenue>) => {
  try {
    const { _id } = revenueData;
    const data = await RevenueModel.findByIdAndUpdate(_id, {
      ...revenueData
    }, { new: true })
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}

export const deleteRevenue = async (id: string) => {
  try {
    const data = await RevenueModel.findByIdAndDelete(id)
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}