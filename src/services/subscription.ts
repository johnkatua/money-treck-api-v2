import { Response } from "express";
import { CustomRequest } from "../middleware/auth";
import { ISubscription, SubscriptionRequestBody } from "../interface/subscription";
import { createSubscription } from "../controllers/subscription";

export const create = async (req: CustomRequest, res: Response) => {
  try {
    const { planName, price, durationInDays } = req.body
    const user_id = req.user?._id;

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + durationInDays)

    const subscriptionData: Partial<SubscriptionRequestBody> = {
      user_id, planName, price, durationInDays, endDate
    }

    const data = await createSubscription(subscriptionData);

    res.status(201).json({
      msg: "Subscription created successfully",
      data
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: "Failed to create subscription",
      error: errorMessage
    })
  }
}