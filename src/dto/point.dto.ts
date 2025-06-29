import { z } from "zod";
import { objectIdValidator } from "../utils/validator";

export const CreatePointDto = z.object({
    user_id: objectIdValidator(),
    points: z.number().nonnegative(),
    reason: z.string().min(5).max(200)
})

export const UpdatePointDto = CreatePointDto.partial();

export type CreatePointDtoType = z.infer<typeof CreatePointDto>
export type UpdatePointDtoType = z.infer<typeof UpdatePointDto>