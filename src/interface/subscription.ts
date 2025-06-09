import { Document, ObjectId } from "mongoose";

export interface ISubscription extends Document {
  user_id: ObjectId;
  plan_id: ObjectId;
  startDate: Date;
  endDate: Date;
  status: "Active" | "Expired" | "Cancelled" | "Pending";
  merchantRequestID: string,
  checkoutRequestID: string
}

// Request body for subscription
export interface SubscriptionRequestBody {
  user_id: string,
  plan_id: string,
  durationInDays: number,
  endDate: Date,
  merchantRequestID: string,
  checkoutRequestID: string
}