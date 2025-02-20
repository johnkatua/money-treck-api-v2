import axios from "axios"
import { generatePaypalToken } from "./generatePaypalToken"

export const processPaypalPayment = async () => {
  const { PAYPAL_BASE_URL } = process.env;
  try {
    const token = await generatePaypalToken()
    const response = await axios.post(
      `${PAYPAL_BASE_URL}/v2/checkout/orders`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
}