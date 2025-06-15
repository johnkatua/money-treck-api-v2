import { CreateCategoryDtoType } from "../dto/category.dto";
import Category from "../models/category";

export class CategoryService {
    async create (data: CreateCategoryDtoType) {
        const existing = await Category.findOne({ name: data?.name })
        if (existing) throw new Error("Category already exists")
        
        return await Category.create(data)
    }
}