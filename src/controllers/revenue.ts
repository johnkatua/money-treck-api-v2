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

export const getRevenues = async (page: number = 1, limit: number = 5) => {
  try {
    const skip = (page - 1) * limit;
    const data = await RevenueModel.find()
      .sort({ createdAt: -1 }) // sort by the latest revenue first
      .skip(skip)
      .limit(limit)
    
    const total = await RevenueModel.countDocuments() // total number of documents
    return { data, total, page, limit, success: true }
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

export const deleteRevenue = async (_id: string) => {
  try {
    const data = await RevenueModel.findByIdAndDelete(_id)
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}