import { GenericService, RequestHandlerAsync } from "../../types/controller.types";
import { asyncWrapper } from "../../utils/async_wrapper";
import { successMsgResponse, successResponse } from "../../utils/response.utils";

export abstract class BaseController<T> {
    constructor(protected readonly service: GenericService<T>) {}

    create: RequestHandlerAsync = asyncWrapper(async (req, res) => {
        const data = req.body;
        const item = await this.service.create(data)
        return successResponse(res, item, 201)
    })

    getAll: RequestHandlerAsync = asyncWrapper(async (req, res) => {
        const items = await this.service.findAll();
        return successResponse(res, items)
    })

    getById: RequestHandlerAsync = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const item = await this.service.findById(id)
        return successResponse(res, item)
    })

    updateById: RequestHandlerAsync = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        const updatedItem = await this.service.updateById(id, data)
        return successResponse(res, updatedItem)
    })

    deleteById: RequestHandlerAsync = asyncWrapper(async (req, res) => {
        const { id } = req.params;
        await this.service.deleteById(id);
        return successMsgResponse(
            res,
            `Resource deleted successfully`
        )
    })
}