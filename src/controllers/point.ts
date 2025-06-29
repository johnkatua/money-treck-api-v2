import Point from "../models/point";
import { PointService } from "../services/point";
import { RequestHandlerAsync } from "../types/controller.types";
import { asyncWrapper } from "../utils/async_wrapper";
import { successResponse } from "../utils/response.utils";
import { BaseController } from "./common/base";

const service = new PointService(Point);

export class PointController extends BaseController<any> {
    constructor() {
        super(service)
    }

    getUserPoints: RequestHandlerAsync = asyncWrapper(async (req, res) => {
        const { userId } = req.params;
        const items = await service.findAllByUserId(userId)
        return successResponse(res, items)
    })

    getUserTotalPoints: RequestHandlerAsync = asyncWrapper(async (req, res) => {
        const { userId } = req.params;
        const total = await service.getTotalPointsForUser(userId);
        return successResponse(res, total)
    })
}
