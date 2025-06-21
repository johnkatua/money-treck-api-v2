import { Document, ObjectId } from "mongoose";

export interface ITransaction extends Document {
    category_id: ObjectId
    user_id: ObjectId,
    amount: number,
    type: String,
    name: String,
    date?: Date,
    status: String,
    is_recurring: Boolean
}