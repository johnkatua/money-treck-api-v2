import { model, Schema } from "mongoose";
import { IBudget } from "../interface/budget";
import { PeriodInterface } from "../interface/period";

const BUDGET_CATEGORIES = [
  "Food", "Housing", "Transportation",
  "Utilities", "Insurance", "Healthcare",
  "Entertainment", "Clothing", "Education",
  "Miscellaneous"
] as const;

const budgetSchema = new Schema<IBudget>({
  name: { type: String, required: true, unique: true, index: true, enum: BUDGET_CATEGORIES },
  amount: { type: Number, required: true },
  period: { type: String, required: true, enum: Object.values(PeriodInterface) },
  user_id: { type: String, required: true }
}, { timestamps: true })

export default model<IBudget>('Budget', budgetSchema);