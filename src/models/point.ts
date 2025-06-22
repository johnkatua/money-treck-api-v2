import { model, Schema } from "mongoose";
import { IPoint } from "../interface/point";

const pointSchema = new Schema<IPoint>({
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    points: { type: Number, required: true, min: 0 },
    reason: { type: String, required: true }
}, { timestamps: true })

export default model<IPoint>('Point', pointSchema)