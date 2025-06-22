import { model, Schema } from "mongoose";
import { IUserBadge } from "../interface/user_badge";

const userBadgeSchema = new Schema<IUserBadge>({
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    badge_id: { type: Schema.Types.ObjectId, ref: "Badge", required: true },
    earned_at: { type: Date, default: Date.now },
    is_unlocked: { type: Boolean, default: true }
}, { timestamps: true })

export default model<IUserBadge>('UserBadge', userBadgeSchema)