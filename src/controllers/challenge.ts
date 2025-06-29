import { NextFunction, Request, Response } from "express";
import { CreateChallengeDto, UpdateChallengeDto } from "../dto/challenge.dto";
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

export const getChallenges = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const challenges = await challengeService.findAll();
        res.json({
            data: challenges
        })
    } catch (error) {
        next(error)
    }
}

export const getChallengeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const challenge = await challengeService.findById(id)
        res.json({
            data: challenge
        })
    } catch (error) {
        next(error)
    }
}

export const updateChallenge = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const data = UpdateChallengeDto.parse(req.body)
        const updatedChallenge = await challengeService.updateById(id, data)
        res.json({
            data: updatedChallenge
        })
    } catch (error) {
        next(error)
    }
}