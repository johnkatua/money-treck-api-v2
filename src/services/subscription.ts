import { Request, Response } from "express";
import { cancelSubscription, createSubscription, getUserSubscriptions } from "../controllers/subscription";
import { SubscriptionRequestBody } from "../interface/subscription";
import { CustomRequest } from "../middleware/auth";
import { processMpesaPayment } from "../utils/processMpesaPayment";
import { getPlan } from "./plan";

export const create = async (req: CustomRequest, res: Response) => {
  try {
    const { plan_id, price, durationInDays } = req.body
    const user_id = req.user?._id;

    const plan = await getPlan(plan_id)

    console.log({ plan })

    const results = await processMpesaPayment(price);

    if (results) {
      const { MerchantRequestID, CheckoutRequestID  } = results;
  
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + durationInDays)
  
      const subscriptionData: Partial<SubscriptionRequestBody> = {
        user_id,
        plan_id,
        durationInDays,
        endDate,
        merchantRequestID: MerchantRequestID,
        checkoutRequestID: CheckoutRequestID
      }
  
      const data = await createSubscription(subscriptionData);
  
      res.status(201).json({
        msg: "Subscription created successfully",
        data
      })
    }


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