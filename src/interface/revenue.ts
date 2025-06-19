import { Document, ObjectId } from "mongoose";
import { PeriodInterface } from "./period";

export enum RecurrenceInterval {
  Daily = "Daily",
  Weekly = "Weekly",
  Monthly = "Monthly",
  Yearly = "Yearly"
}

export interface IRevenue extends Document {
  category_id: ObjectId,
  user_id: ObjectId,
  name: string,
  amount: number,
  period: PeriodInterface,
  start_date: Date,
  is_recurring: Boolean,
  is_active?: Boolean,
  recurrence_pattern?: {
    interval: RecurrenceInterval,
    end_date?: Date
  }
}
