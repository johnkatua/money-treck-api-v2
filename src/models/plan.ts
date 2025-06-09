import { model, Schema } from "mongoose";
import { BillingCycleTypes } from "../interface/enums";
import { IPlan } from "../interface/plan";

const planSchema = new Schema<IPlan>({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number },
    billingCycle: { type: String, enum: BillingCycleTypes },
    features: { type: [String] },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
})

export default model<IPlan>('Plan', planSchema)