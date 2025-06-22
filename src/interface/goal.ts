import { Document, Types } from "mongoose";
import { GoalStatus } from "./enums";

export interface IGoal extends Document {
    user_id: Types.ObjectId,
    category_id: Types.ObjectId,
    title: string,
    target_amount: number,
    current_amount: number,
    deadline: Date,
    status: GoalStatus,
    progress: number
}