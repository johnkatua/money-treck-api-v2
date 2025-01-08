import PaymentModel from "../models/payment"

export const mpesaCallback = async (paymentId: string) => {
  try {
    const data = await PaymentModel.findByIdAndUpdate(paymentId, {
      paymentStatus: 'Completed'
    })
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}