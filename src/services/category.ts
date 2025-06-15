import { CreateCategoryDtoType, UpdateCategoryDtoType } from "../dto/category.dto";
import Category from "../models/category";

export class CategoryService {
    async create (data: CreateCategoryDtoType) {
        const existing = await Category.findOne({ name: data?.name })
        if (existing) throw new Error("Category already exists")
        
        return await Category.create(data)
    }

    async findAll(filter: Record<string, any> = {}) {
        return await Category.find(filter).sort({ created: -1 })
    }

    async findById(id: string) {
        const category = await Category.findById(id);
        if (!category) throw new Error("Category not found")
        
        return category
    }

    async updateById(id: string, data: UpdateCategoryDtoType) {
        const category = await Category.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })

        if (!category) throw new Error("Category not found")
        
        return category
    }

    async deleteById(id: string) {
        const result = await Category.findByIdAndDelete(id);
        if (!result) throw new Error("Category not found");
        return { message: "Category deleted successfully" };
    }
}