import { ObjectId } from "mongoose";

export interface IPayment extends Document {
  userId: ObjectId;
  amount: number;
  paymentMethod: 'Mpesa' | 'Stripe';
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
  transactionId?: string;
  createdAt: Date
}