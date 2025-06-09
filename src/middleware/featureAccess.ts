import { NextFunction, Response } from "express"
import Subscription from "../models/subscription"
import { CustomRequest } from "./auth"

const checkFeatureAccess =  (requiredFeature: string) => {
    return async (req: CustomRequest, res: Response, next: NextFunction) => {
        const subscription = await Subscription.findOne({ user_id: req.user?._id }).populate('plan_id')

        if (!subscription || !subscription.plan_id.features.includes(requiredFeature)) {
            return res.status(403).json({
                msg: 'You do not have access to this feature.'
            })
        }

        next();
    }
}

export default checkFeatureAccess