import { z } from "zod";
import { ChallengeStatus, ChallengeType } from "../interface/enums";

export const CreateChallengeDto = z.object({
    title: z.string().min(3).max(100),
    description: z.string().optional(),
    type: z.nativeEnum(ChallengeType),
    start_date: z.date(),
    end_date: z.date(),
    participants: z.array(z.string()).optional(),
    rewards: z.array(z.string()).optional(),
    status: z.nativeEnum(ChallengeStatus)
})

export const UpdateChallengeDto = CreateChallengeDto.partial()

export type CreateChallengeDtoType = z.infer<typeof CreateChallengeDto>
export type UpdateChallengeDtoType = z.infer<typeof UpdateChallengeDto>