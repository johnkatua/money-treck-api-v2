import { Request, Response } from "express";
import { CustomRequest } from "../middleware/auth";
import { ISubscription, SubscriptionRequestBody } from "../interface/subscription";
import { cancelSubscription, createSubscription, getUserSubscriptions } from "../controllers/subscription";

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

export const getUserSubscriptionsService = async (req: CustomRequest, res: Response) => {
  try {
    const { user_id } = req.params;
    const data = await getUserSubscriptions(user_id)

    res.status(200).json({
      msg: "Subscriptions fetched successfully",
      data
    })
  } catch (error: any) {
    res.status(500).json({
      msg: "Failed to fetch subscriptions",
      error: error.message
    })
  }
}

export const cancelSubscriptionService = async (req: Request<{ id: string }>, res: Response): Promise<any> => {
  try {
    const { id } = req.params;

    const data = await cancelSubscription(id)

    if (!data) {
      return res.status(404).json({
        msg: "Subscription not found"
      })
    }

    res.status(200).json({
      msg: "Subscription cancelled",
      data
    })
  } catch (error: any) {
    res.status(500).json({
      msg: "Failed to cancel subscription",
      error: error.message
    })
  }
}