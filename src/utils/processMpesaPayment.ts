import axios from "axios";
import { generateMpesaToken } from "./generateMpesaToken"
import PaymentModel from "../models/payment";

export const processMpesaPayment = async (amount: number, paymentId: string) => {
  try {
    const token = await generateMpesaToken();

    const { MPESA_SHORTCODE, MPESA_PASSWORD, BASE_URL } = process.env;

    // Initiate Mpesa payment process
    const response = await axios.post(
      '',
      {
        
      },
      {
        headers: {
        Authorization: `Bearer ${token}`
      }}
    )

    return response.data
  } catch (error) {
    console.error(error);
    await PaymentModel.findByIdAndUpdate(paymentId, { paymentStatus: 'Failed' });
    throw new Error('Mpesa payment failed');
  }
}