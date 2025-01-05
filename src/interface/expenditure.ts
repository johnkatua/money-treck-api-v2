import { ObjectId } from "mongoose";

export interface IExpenditure {
  _id?: ObjectId,
  name?: string,
  amount: number
  budget_id: string,
  user_id: string
}