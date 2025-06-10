import SubscriptionModel from "../models/subscription"

export const mpesaCallback = async (MerchantRequestID: string, ResultCode: number) => {
  console.log("Here", MerchantRequestID, ResultCode)
  try {
    if (ResultCode !== 0) {
      console.log("There", ResultCode)
      const res = await SubscriptionModel.findOneAndUpdate({ merchantRequestID: MerchantRequestID}, {
        status: 'Cancelled'
      })
      console.log({ res })
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