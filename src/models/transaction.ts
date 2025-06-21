import { Schema } from "mongoose";
import { ITransaction } from "../interface/transaction";

const transactionSchema = new Schema<ITransaction>({
    category_id: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    name: { type: String, required: true },
    date: { type: String, default: Date.now },
    status: {},
    is_recurring: { type: Boolean, default: false }
})