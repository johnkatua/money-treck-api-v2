import { Document } from "mongoose";

export interface ICategory extends Document {
    name: string,
    user_id: string,
    type: "Revenue" | "Expense" | "Goal",
    global?: Boolean
}