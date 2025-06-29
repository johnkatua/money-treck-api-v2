import { Model } from "mongoose";
import { IGoal } from "../interface/goal";
import { GenericService } from "./generic";

export class GoalService extends GenericService<IGoal> {
    constructor (model: Model<IGoal>) {
        super(model)
    }

    async addContribution(goalId: string, amount: number) {
        const goal = await this.findById(goalId);

        if (amount <= 0) throw new Error("Contribution must be positive");

        const newCurrent = (goal ? goal.current_amount : 0) + amount;
        const newProgress = Math.min(100, (newCurrent / (goal ? goal?.target_amount : 0)) * 100);

        return await this.updateById(goalId, {
            current_amount: newCurrent,
            progress: newProgress
        })
    }
}