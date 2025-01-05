import { IRevenue } from "../interface/revenue";
import RevenueModel from "../models/revenue";

export const createRevenue = async (req, res) => {
  try {
    const { name, amount, period } = req;
    const user_id = req.user._id
    const data = await RevenueModel.create({
      name, amount, period, user_id
    })
    
    res.status(201).json({
      msg: "Revenue created successfully",
      data
    })
  } catch (error) {
    res.status(500).json({
      msg: "Failed to create revenue",
      error: error.message
    })
  }
}