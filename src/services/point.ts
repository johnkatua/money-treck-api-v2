import { Model } from "mongoose";
import { IPoint } from "../interface/point";
import { GenericService } from "./generic";


export abstract class PointService extends GenericService<IPoint> {
    constructor (model: Model<IPoint>) {
        super(model)
    }

    async findAllByUserId(userId: string) {
        return await this.model.find({ user_id: userId }).sort("-timestamp").exec()
    }
}