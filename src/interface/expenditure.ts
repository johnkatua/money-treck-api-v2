import { ObjectId } from "mongoose";

export interface IExpenditure {
  _id?: ObjectId,
  name: string,
  amount: number
  user_id: string
}