import { model, Schema } from "mongoose";
import { IChallenge } from "../interface/challenge";
import { ChallengeStatus, ChallengeType } from "../interface/enums";

const challengeSchema = new Schema<IChallenge>({
    title: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    type: { type: String, enum: Object.values(ChallengeType), required: true },
    start_date: { type: Date, default: Date.now },
    end_date: { type: Date, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref:"User", default: [] }],
    rewards: [{ type: String, default: [] }],
    status: {
        type: String,
        enum: Object.values(ChallengeStatus),
        default: ChallengeStatus.Open
    }
}, { timestamps: true })

export default model<IChallenge>('Challenge', challengeSchema)