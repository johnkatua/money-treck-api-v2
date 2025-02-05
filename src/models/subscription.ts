import { model, Schema } from "mongoose";
import { ISubscription } from "../interface/subscription";

const subscriptionSchema = new Schema<ISubscription>({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  planName: { type: String, enum: ["Monthly", "Yearly"], required: true },
  price: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["Active", "Expired", "Cancelled", "Pending"], default: "Pending" }
}, { timestamps: true })

export default model<ISubscription>('Subscription', subscriptionSchema)