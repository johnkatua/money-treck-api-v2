import { ObjectId } from "mongoose";

export interface IUser {
  _id?: ObjectId,
  id: string
  name: string,
  password: string,
  phoneNumber: string,
  avatar?: string,
  currency?: string
}