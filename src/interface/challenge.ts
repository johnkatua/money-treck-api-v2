import { Document } from "mongoose";

export interface IChallenge extends Document {
    title: string,
    description: string,
    
}