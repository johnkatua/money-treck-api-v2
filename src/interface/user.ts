import { ObjectId } from "mongoose";

export interface IUser {
  _id?: ObjectId,
  name: string,
  password: string,
  phoneNumber: string,
}