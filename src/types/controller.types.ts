import { NextFunction, Request, Response } from "express";

export type RequestHandlerAsync = (req: Request, res: Response, next: NextFunction) => Promise<void>