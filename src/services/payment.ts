import { Response } from "express";
import { mpesaCallback } from "../controllers/payment";
import { CustomRequest } from "../middleware/auth";

export const mpesaCallbackService = async (req: CustomRequest, res: Response) => {
  console.log("Mpesa callback service called", req.body)
  try {
    const { Body } = req.body;

    const { stkCallback: { ResultCode, MerchantRequestID } } = Body;

    if (ResultCode !== 0) {
      res.status(400).json({
        msg: "Payment failed",
        data: Body
      })
      return;
    }

    await mpesaCallback(MerchantRequestID);

    res.status(200).json({
      msg: "Payment processed successfully",
    })
  } catch (error: any) {
    res.status(500).json({
      msg: "Failed to process payment",
      error: error.message
    })
  }
}