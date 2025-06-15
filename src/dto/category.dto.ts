import { z } from "zod";
import { objectIdValidator } from "../utils/validator";

export const CreateCategoryDto = z.object({
    name: z.string().min(2).max(50),
    type: z.enum(["Revenue", "Expense"]),
    user_id: objectIdValidator(),
    global: z.boolean().optional(),
})

export const UpdateCategoryDto = z.object({
  name: z.string().min(2).max(50).optional(),
  type: z.enum(["Revenue", "Expense"]).optional(),
  user_id: objectIdValidator().optional(),
  global: z.boolean().optional(),
});

export type CreateCategoryDtoType = z.infer<typeof CreateCategoryDto>;
export type UpdateCategoryDtoType = z.infer<typeof UpdateCategoryDto>;