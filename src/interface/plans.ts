import { ObjectId } from "mongoose";
import { BillingCycleTypes } from "./enums";

export interface IPlan {
    _id?: ObjectId,
    name: string,
    description: string,
    price: number,
    billingCycle: BillingCycleTypes,
    features: Array<string>,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
}