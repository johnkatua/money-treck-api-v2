import Revenue from "../models/revenue";
import Expenditure from "../models/expenditure";

export const getFinancialOverview = async () => {
  try {
    const revenue = await Revenue.aggregate([{
      $group: { _id: null, total: { $sum: "$amount" }}
    }])
    const expenses = await Expenditure.aggregate([{
      $group: { _id: null, total: { $sum: "$amount" }}
    }])

    const totalRevenue = revenue[0]?.total || 0;
    const totalExpenses = expenses[0]?.total || 0;
    const netProfit = totalRevenue - totalExpenses;

    return {
      data: {
        totalRevenue, totalExpenses, netProfit
      },
      success: true
    }
  } catch (error) {
    return { data: null, success: false, error }
  }
}