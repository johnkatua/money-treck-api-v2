import { Document, ObjectId } from "mongoose";

export interface ISubscription extends Document {
  user_id: ObjectId;
  planName: "Free" | "Basic" | "Premium";
  price: number;
  startDate: Date;
  endDate: Date;
  status: "Active" | "Expired" | "Cancelled";
}

// Request body for subscription
export interface SubscriptionRequestBody {
  user_id: string,
  planName: "Free" | "Basic" | "Premium",
  price: number,
  durationInDays: number,
  endDate: Date
}