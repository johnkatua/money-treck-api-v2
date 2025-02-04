import axios from "axios";

export const generateMpesaToken = async () => {
  const { MPESA_AUTH_KEY } = process.env;
  try {
    const tokenResponse = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${MPESA_AUTH_KEY}`
        }
      }
    )

    return tokenResponse.data.access_token
  } catch (error) {
    console.error(error)
  }
}




