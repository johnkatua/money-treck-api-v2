import { model, Schema } from "mongoose";
import { IRevenue } from "../interface/revenue";
import { PeriodInterface } from "../interface/period";

const revenueSchema = new Schema<IRevenue>({
  name: { type: String, required: true, unique: true, index: true },
  amount: { type: Number, required: true },
  period: { type: PeriodInterface, required: true },
  user_id: { type: String }
}, { timestamps: true })

export default model<IRevenue>('Revenue', revenueSchema)