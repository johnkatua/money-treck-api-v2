import { Document, Types } from "mongoose";

export interface IPoint extends Document {
    user_id: Types.ObjectId,
    points: number,
    reason: string
}