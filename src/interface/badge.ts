import { Document } from "mongoose";

export interface IBadge extends Document {
    name: string,
    description: string,
    criteria: string,
    image: string
}