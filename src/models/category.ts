import { model, Schema } from "mongoose";
import { ICategory } from "../interface/category";

const categorySchema = new Schema<ICategory>({
    name: { 
        type: String, 
        required: [true, "Name is required"], 
        unique: true,
        trim: true,
        lowercase: true
    },
    type: { 
        type: String, 
        required: [true, "Type is required"], 
        enum: {
            values: ["Revenue", "Expense"],
            message: "{VALUE} is not a valid type, use 'Revenue' or 'Expense'." 
        }
    },
    user_id: { 
        type: String, 
        required: [true, "User ID is required"],
        index: true 
    },
    global: { type: Boolean, default: false, index: true }
}, { 
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

categorySchema.index({ user_id: 1, type: 1 })

const Category = model<ICategory>('Category', categorySchema);

export default Category