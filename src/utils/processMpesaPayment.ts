import axios from "axios";
import { generateMpesaToken } from "./generateMpesaToken"
import PaymentModel from "../models/payment";

export const processMpesaPayment = async (amount: number, paymentId: string) => {
  try {
    const token = await generateMpesaToken();

    const { MPESA_SHORTCODE, MPESA_PASSWORD, BASE_URL } = process.env;

    // Initiate Mpesa payment process -> M-Pesa Express Simulate
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: MPESA_SHORTCODE,
        Password: MPESA_PASSWORD,
        Timestamp: new Date().toISOString(),
        TransactionType: 'CustomerPaybillOnline',
        Amount: amount,
        PartyA: 'USER_PHONE_NUMBER',
        PartyB: MPESA_SHORTCODE,
        PhoneNumber: 'USER_PHONE_NUMBER',
        CallBackURL: `${BASE_URL}/mpesa/callback`,
        AccountReference: paymentId,
        TransactionDesc: 'Payment for Subscription'
      },
      {
        headers: {
        Authorization: `Bearer ${token}`
      }}
    )

    return response.data
  } catch (error) {
    console.error(error);
    // await PaymentModel.findByIdAndUpdate(paymentId, { paymentStatus: 'Failed' });
    throw new Error('Mpesa payment failed');
  }
}