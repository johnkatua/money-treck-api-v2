import { model, Schema } from "mongoose";
import { GoalStatus } from "../interface/enums";
import { IGoal } from "../interface/goal";

const goalSchema = new Schema<IGoal>({
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category_id: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    title: { type: String, required: true, trim: true },
    target_amount: { type: Number, required: true, min: 10 },
    current_amount: { type: Number, default: 0, min: 0 },
    deadline: { type: Date, required: true },
    status: {
        type: String,
        enum: Object.values(GoalStatus),
        default: GoalStatus.Active
    },
    progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    }
}, { timestamps: true })

export default model<IGoal>('Goal', goalSchema)