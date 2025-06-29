import Goal from "../models/goal";
import { GoalService } from "../services/goal.services";
import { RequestHandlerAsync } from "../types/controller.types";
import { asyncWrapper } from "../utils/async_wrapper";
import { successResponse } from "../utils/response.utils";
import { BaseController } from "./common/base";

const service = new GoalService(Goal)

export class GoalController extends BaseController<any> {
    constructor() {
        super(service)
    }

    contributeToGoal: RequestHandlerAsync = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const { amount } = req.body;

        if (!amount || typeof amount !== "number") {
            throw new Error("Enter a valid amount")
        }

        const item = await service.addContribution(id, amount);
        return successResponse(res, item)
    })
}