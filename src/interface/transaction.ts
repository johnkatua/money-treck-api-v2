import { Document, ObjectId } from "mongoose";
import { TransactionStatus, TransactionType } from "./enums";

export interface ITransaction extends Document {
    category_id: ObjectId
    user_id: ObjectId,
    amount: number,
    type: TransactionType,
    name: String,
    date?: Date,
    status: TransactionStatus,
    is_recurring: Boolean
}