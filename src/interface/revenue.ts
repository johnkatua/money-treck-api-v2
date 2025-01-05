import { ObjectId } from "mongoose";
import { PeriodInterface } from "./period";

export interface IRevenue {
  _id?: ObjectId,
  name: string,
  amount: string,
  period: PeriodInterface,
  user_id: string,
}
