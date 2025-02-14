import axios from "axios";

export const generatePaypalToken = async () => {
  const { PAYPAL_BASE_URL, PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } = process.env;
  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`).toString("base64")
    const tokenResponse = await axios.post(
      `${PAYPAL_BASE_URL}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`
        },
      }
    );
    return tokenResponse.data.access_token;
  } catch (error) {
    console.error(error);
  }
};

generatePaypalToken();
