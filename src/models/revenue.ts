import { model, Schema } from "mongoose";
import { IRevenue } from "../interface/revenue";
import { PeriodInterface } from "../interface/period";

const REVENUE_CATEGORIES = [
  "Ad", "Subscription", "Donation",
  "Job", "Business", "Affiliate",
  "SideProject", "Investment", "Other"
] as const;

const revenueSchema = new Schema<IRevenue>({
  name: { type: String, required: true, unique: true, index: true, enum: REVENUE_CATEGORIES },
  amount: { type: Number, required: true },
  period: { type: String, required: true, enum: Object.values(PeriodInterface) },
  user_id: { type: String, required: true }
}, { timestamps: true })

export default model<IRevenue>('Revenue', revenueSchema)