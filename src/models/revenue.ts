import { model, Schema } from "mongoose";
import { RecurrenceInterval } from "../interface/enums";
import { IRevenue } from "../interface/revenue";

const REVENUE_CATEGORIES = [
  "Ad", "Subscription", "Donation",
  "Job", "Business", "Affiliate",
  "SideProject", "Investment", "Other"
] as const;

const revenueSchema = new Schema<IRevenue>({
  name: { type: String, required: true, unique: true, index: true },
  amount: { type: Number, required: true },
  period: { type: String, required: true, enum: Object.values(RecurrenceInterval) },
  user_id: { type: String, required: true },
  category_id: { type: String },
  start_date: { type: String, default: Date.now },
  is_recurring: { type: Boolean, default: false },
  recurrence_pattern: {
    interval: {
      type: String,
      enum: Object.values(RecurrenceInterval)
    },
    end_date: { type: Date }
  }
}, { timestamps: true })

export default model<IRevenue>('Revenue', revenueSchema)