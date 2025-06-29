import { NextFunction, Request, Response } from "express";
import { CreateChallengeDto } from "../dto/challenge.dto";
import { ChallengeService } from "../services/challenge";

const challengeService = new ChallengeService()

export const createChallenge = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = CreateChallengeDto.parse(req.body)
        const challenge = await challengeService.create(data);
        res.status(201).json({
            data: challenge
        })
    } catch (error) {
        next(error)
    }
}