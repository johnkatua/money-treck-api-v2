import axios from "axios";

export const generatePaypalToken = async () => {
  const { PAYPAL_BASE_URL, PAYPAL_CLIENT_ID, PAYPAL_SECRET_KEY } = process.env;
  try {
    const tokenResponse = await axios.post(
      `${PAYPAL_BASE_URL}/v1/oauth2/token`,
      {
        data: "grant_type=client_credentials",
      },
      {
        headers: {
          username: PAYPAL_CLIENT_ID,
          password: PAYPAL_SECRET_KEY,
        },
      }
    );
    console.log(tokenResponse);
  } catch (error) {
    console.error(error);
  }
};

generatePaypalToken();
