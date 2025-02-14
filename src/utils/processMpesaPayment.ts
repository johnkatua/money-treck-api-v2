import axios from "axios";
import { generateMpesaToken } from "./generateMpesaToken";
import { generateTimestamp } from "./generateTimestamp";

export const processMpesaPayment = async (amount: number) => {
  try {
    const token = await generateMpesaToken();

    const timestamp = generateTimestamp();

    const { MPESA_SHORTCODE, MPESA_PASSWORD, BASE_URL } = process.env;

    // Initiate Mpesa payment process -> M-Pesa Express Simulate
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: MPESA_SHORTCODE,
        Password: MPESA_PASSWORD,
        Timestamp: "20250205013729",
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: 254795029709,
        PartyB: MPESA_SHORTCODE,
        PhoneNumber: 254795029709,
        CallBackURL: `${BASE_URL}/api/payments/mpesa/callback`,
        AccountReference: "Money Treck Solutions",
        TransactionDesc: 'Payment for Subscription'
      },
      {
        headers: {
        Authorization: `Bearer ${token}`
      }}
    )

    return response.data
  } catch (error: any) {
    const errorMessage = error.response.data.errorMessage
    console.error(error.response.data.errorMessage);
    // await PaymentModel.findByIdAndUpdate(paymentId, { paymentStatus: 'Failed' });
    throw new Error(`Mpesa payment failed-${errorMessage}`);
  }
}