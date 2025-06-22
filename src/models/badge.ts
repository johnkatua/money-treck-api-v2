import { model, Schema } from "mongoose";
import { IBadge } from "../interface/badge";

const badgeSchema = new Schema<IBadge>({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    criteria: { type: String, required: true },
    image: { type: String }
}, { timestamps: true })

export default model<IBadge>('Badge', badgeSchema)