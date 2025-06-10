import SubscriptionModel from "../models/subscription";

export const mpesaCallback = async (MerchantRequestID: string, ResultCode: number) => {
  try {
    if (ResultCode !== 0) {
      await SubscriptionModel.findOneAndUpdate({ merchantRequestID: MerchantRequestID}, {
        status: 'Cancelled'
      });
      return
    }
    const data = await SubscriptionModel.findOneAndUpdate({ merchantRequestID: MerchantRequestID}, {
      status: 'Active'
    })
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}