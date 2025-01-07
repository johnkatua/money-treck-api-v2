import mongoose, { Schema } from "mongoose";
import { IPayment } from "../interface/payment";

const paymentSchema = new Schema<IPayment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Mpesa', 'Stripe'], required: true },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  transactionId: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true })

export default mongoose.model<IPayment>('Payment', paymentSchema);