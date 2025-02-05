import SubscriptionModel from "../models/subscription"

export const mpesaCallback = async (paymentId: string) => {
  try {
    const data = await SubscriptionModel.findByIdAndUpdate({ user_id: paymentId}, {
      status: 'Active'
    })
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}