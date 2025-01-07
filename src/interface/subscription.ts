import { Document, ObjectId } from "mongoose";

export interface ISubscription extends Document {
  user_id: ObjectId;
  planName: "Free" | "Basic" | "Premium";
  price: number;
  startDate: Date;
  endDate: Date;
  status: "Active" | "Expired" | "Cancelled";
}