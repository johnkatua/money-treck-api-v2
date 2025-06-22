import { Document } from "mongoose";
import { CategoryType } from "./enums";

export interface ICategory extends Document {
    name: string,
    user_id: string,
    type: CategoryType,
    global?: Boolean
}