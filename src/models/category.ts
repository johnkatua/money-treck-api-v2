import { Document, model, Schema } from "mongoose";
import { ICategory } from "../interface/category";
import { CategoryType } from "../interface/enums";

const categorySchema = new Schema<ICategory & Document>({
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
            values: Object.values(CategoryType),
            message: `{VALUE} is not a valid type, use items in the list ${Object.values(CategoryType)}`
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

const Category = model<ICategory & Document>('Category', categorySchema);

export default Category