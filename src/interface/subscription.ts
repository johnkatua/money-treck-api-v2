import { Document, ObjectId } from "mongoose";

export interface ISubscription extends Document {
  user_id: ObjectId;
  planName: "Monthly" | "Yearly";
  price: number;
  startDate: Date;
  endDate: Date;
  status: "Active" | "Expired" | "Cancelled" | "Pending";
}

// Request body for subscription
export interface SubscriptionRequestBody {
  user_id: string,
  planName: "Monthly" | "Yearly",
  price: number,
  durationInDays: number,
  endDate: Date
}