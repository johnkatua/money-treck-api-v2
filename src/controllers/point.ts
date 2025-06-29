import Point from "../models/point";
import { PointService } from "../services/point";
import { BaseController } from "./common/base";

const service = new PointService(Point);

export class PointController extends BaseController<any> {
    constructor() {
        super(service)
    }
}