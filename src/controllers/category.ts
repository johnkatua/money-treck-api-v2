import { NextFunction, Request, Response } from "express"
import { CreateCategoryDto } from "../dto/category.dto"
import { CategoryService } from "../services/category"

const categoryService = new CategoryService()

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user_id = req.user?._id
        const categoryData = { user_id, ...req.body }
        const data = CreateCategoryDto.parse(categoryData)
        const category = await categoryService.create(data)
        res.status(201).json({
            data: category,
            message: 'Category created successfully'
        })
    } catch (error) {
        next(error)
    }
}