import { ObjectId } from "mongoose";
import { PeriodInterface } from "./period";

export interface IRevenue {
  _id?: ObjectId,
  category_id: ObjectId,
  user_id: ObjectId,
  name: string,
  amount: number,
  period: PeriodInterface,
  start_date: Date,
  end_date?: Date,
  recurring?: Boolean,
  is_active?: Boolean
}
