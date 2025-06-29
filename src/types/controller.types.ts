import { NextFunction, Request, Response } from "express";

export type RequestHandlerAsync = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export interface GenericService<T> {
    create(data: Partial<T>): Promise<T>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    updateById(id: string, data: Partial<T>): Promise<T | null>;
    deleteById(id: string): Promise<{msg: string}>;
}
