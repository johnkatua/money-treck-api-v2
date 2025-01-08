import axios from "axios";

export const generateMpesaToken = async () => {
  const { MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET } = process.env;
  try {
    const tokenResponse = await axios.post(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {},
      {
        auth: {
          username: MPESA_CONSUMER_KEY!,
          password: MPESA_CONSUMER_SECRET!
        }
      }
    )

    return tokenResponse.data.access_token
  } catch (error) {
    console.error(error)
  }
}