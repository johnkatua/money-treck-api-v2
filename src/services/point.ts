import { CreatePointDtoType } from "../dto/point.dto";
import Point from "../models/point";

export class PointService {
    async create(data: CreatePointDtoType) {
        return await Point.create(data)
    }
}