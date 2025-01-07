import { SubscriptionRequestBody } from "../interface/subscription";
import subscription from "../models/subscription";

export const createSubscription = async (subscriptionData: Partial<SubscriptionRequestBody>) => {
  try {
    const data = await subscription.create(subscriptionData);
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}