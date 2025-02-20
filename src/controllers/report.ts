import Revenue from "../models/revenue";
import Expenditure from "../models/expenditure";
import Budget from "../models/budget";
import { format } from "morgan";

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

export const getBudgetVsExpense = async () => {
  try {
    const budgets = await Budget.aggregate([
      {
        $lookup: {
          from: "expenditure",
          localField: "_id",
          foreignField: "budgetId",
          as: "expenses"
        }
      },
      {
        $project: {
          name: 1,
          totalBudget: "$amount",
          totalExpenses: { $sum: "$expenses.amount" },
          utilizationRate: {
            $multiply: [
              { $divide: [{ $sum: "expenses.amount" }, "$amount"] },
              100
            ]
          }
        }
      }
    ])

    return { data: budgets, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
};

export const getRevenueTrends = async () => {
  try {
    const data = await Revenue.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 }}
    ])

    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}