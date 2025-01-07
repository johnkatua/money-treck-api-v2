import { SubscriptionRequestBody } from "../interface/subscription";
import SubscriptionModel from "../models/subscription";

export const createSubscription = async (subscriptionData: Partial<SubscriptionRequestBody>) => {
  try {
    const data = await SubscriptionModel.create(subscriptionData);
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}

export const getUserSubscriptions = async (user_id: string) => {
  try {
    const data = await SubscriptionModel.find({ user_id });
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}