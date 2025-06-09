import { ObjectId } from "mongoose";

export interface IPlan {
    _id?: ObjectId,
    name: string,
    description: string,
    price: number,
    billingCycle: string,
    features: Array<string>,
    isActive: boolean
}