import { z } from "zod";

export const objectIdValidator = () => 
    z.string().regex(/^[0-9a-fA-F]{24}/, "Invalid ObjectId")