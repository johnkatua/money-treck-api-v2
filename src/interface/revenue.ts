import { Document, ObjectId } from "mongoose";
import { RecurrenceInterval } from "./enums";


export interface IRevenue extends Document {
  category_id: ObjectId,
  user_id: ObjectId,
  name: string,
  amount: number,
  period: RecurrenceInterval,
  start_date: Date,
  is_recurring: Boolean,
  is_active?: Boolean,
  recurrence_pattern?: {
    interval: RecurrenceInterval,
    end_date?: Date
  }
}
