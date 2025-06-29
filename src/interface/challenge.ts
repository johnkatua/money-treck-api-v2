import { Document, Types } from "mongoose";
import { ChallengeStatus, ChallengeType } from "./enums";

export interface IChallenge extends Document {
    title: string,
    description: string,
    type: ChallengeType,
    start_date: Date,
    end_date: Date,
    participants: Types.ObjectId[],
    rewards: string[],
    status: ChallengeStatus
}