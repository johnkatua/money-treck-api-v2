import { RequestHandler } from "express";

export const asyncWrapper = (fn: RequestHandler) => {
    return async (req: any, res: any,  next: any) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}