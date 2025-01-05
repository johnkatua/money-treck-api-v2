import { model, Schema } from "mongoose";
import { IExpenditure } from "../interface/expenditure";

const expenditureSchema = new Schema<IExpenditure>({
  name: { type: String },
  amount: { type: Number, required: true },
  budget_id: { type: String, required: true },
  user_id: { type: String, required: true }
}, { timestamps: true })

export default model<IExpenditure>('Expenditure', expenditureSchema);