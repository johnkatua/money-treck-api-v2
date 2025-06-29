import mongoose, { Model } from "mongoose";
import { IPoint } from "../interface/point";
import { GenericService } from "./generic";


export class PointService extends GenericService<IPoint> {
    constructor (model: Model<IPoint>) {
        super(model)
    }

    async findAllByUserId(userId: string) {
        return await this.model.find({ user_id: userId }).sort("-timestamp").exec()
    }

    async getTotalPointsForUser(userId: string) {
        const result = await this.model.aggregate([
            {
                $match: {
                    user_id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$points"
                    }
                }
            }
        ])
        return result.length > 0 ? result[0].total : 0
    }
}