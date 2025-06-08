import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  avatar?: string;
  currency?: string;
  role?: string;
  is_subscribed?: boolean
}
