import { NextFunction, Request, Response } from "express"
import { CreateCategoryDto, UpdateCategoryDto } from "../dto/category.dto"
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
            msg: 'Category created successfully'
        })
    } catch (error) {
        next(error)
    }
}

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filter = req.query || {};
        const categories = await categoryService.findAll(filter)
        res.json({
            data: categories
        })
    } catch (error) {
        next(error)
    }
}

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const category = await categoryService.findById(id)
        res.json(category)
    } catch (error) {
        next(error)
    }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const data = UpdateCategoryDto.parse(req.body)
        const updated = await categoryService.updateById(id, data);
        res.json({
            data: updated,
            msg: 'Category updated successfully'
        })
    } catch (error) {
        next(error)
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        await categoryService.deleteById(id)
        res.json({
            msg: 'Category deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}