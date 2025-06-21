import { model, Schema } from "mongoose";
import { TransactionStatus, TransactionType } from "../interface/enums";
import { ITransaction } from "../interface/transaction";

const transactionSchema = new Schema<ITransaction>({
    category_id: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: Object.values(TransactionType), required: true },
    name: { type: String, required: true },
    date: { type: String, default: Date.now },
    status: {  type: String, enum: Object.values(TransactionStatus) },
    is_recurring: { type: Boolean, default: true }
}, { timestamps: true })

export default model<ITransaction>('Transaction', transactionSchema)