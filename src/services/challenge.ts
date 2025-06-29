import { CreateChallengeDtoType, UpdateChallengeDtoType } from "../dto/challenge.dto";
import Challenge from "../models/challenge";

export class ChallengeService {
    async create(data: CreateChallengeDtoType) {
        return await Challenge.create(data)
    }

    async findAll() {
        return await Challenge.find().sort("-createdAt")
    }

    async findById(id: string) {
        const challenge = await Challenge.findById(id)
        if (!challenge) throw new Error("Challenge not found")
        return challenge
    }

    async updateById(id: string, data: UpdateChallengeDtoType) {
        const updatedChallenge = await Challenge.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        })
        if (!updatedChallenge) throw new Error("Challenge not found")
        return updatedChallenge
    }

    async deleteById(id: string) {
        const result = await Challenge.findByIdAndDelete(id);
        if (!result) throw new Error("Challenge not found")
        return {
            msg: "Challenge deleted successfully"
        }
    }

    async addParticipants(challengeId: string, userId: string) {
        const challenge = await this.findById(challengeId)
        if (!challenge.participants.includes(userId as any)) {
            challenge.participants.push(userId as any)
            await challenge.save()
        }

        return challenge
    }

    async removeParticipants(challengeId: string, userId: string) {
        const challenge = await this.findById(challengeId)
        challenge.participants = challenge.participants.filter(
            (id) => id.toString() !== userId
        )
        await challenge.save()
        return challenge
    }

    async getParticipants(challengeId: string) {
        const challenge = await this.findById(challengeId)
        return challenge.participants
    }
}