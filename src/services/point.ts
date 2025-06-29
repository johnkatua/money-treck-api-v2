import { Model } from "mongoose";
import { IPoint } from "../interface/point";
import { GenericService } from "./generic";


export class PointService extends GenericService<IPoint> {
    constructor (model: Model<IPoint>) {
        super(model)
    }
}