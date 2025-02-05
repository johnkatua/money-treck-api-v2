import SubscriptionModel from "../models/subscription"

export const mpesaCallback = async (MerchantRequestID: string) => {
  try {
    const data = await SubscriptionModel.findByIdAndUpdate({ merchantRequestID: MerchantRequestID}, {
      status: 'Active'
    })
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}