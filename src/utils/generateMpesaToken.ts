import axios from "axios";

export const generateMpesaToken = async () => {
  try {
    const tokenResponse = await axios.post(
      'url',
      {
        auth: {
          username: '',
          password: ''
        }
      }
    )

    return tokenResponse.data.access_token
  } catch (error) {
    console.error(error)
  }
}