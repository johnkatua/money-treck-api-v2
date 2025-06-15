import { ObjectId } from "mongoose";

export interface ICategory {
    _id?: ObjectId,
    user_id: ObjectId,
    name: string,
    type: string,
    global?: Boolean
}