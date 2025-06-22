import { Document, Types } from "mongoose";

export interface IUserBadge extends Document {
    user_id: Types.ObjectId,
    badge_id: Types.ObjectId,
    earned_at: Date,
    is_unlocked: boolean
}