import { Response } from "express";
import { mpesaCallback } from "../controllers/payment";
import { CustomRequest } from "../middleware/auth";

export const mpesaCallbackService = async (req: CustomRequest, res: Response) => {
  try {
    const { Body } = req.body;

    if (Body.stkCallback.ResultCode === 0) {
      const paymentId = Body.stkCallback.CallbackMetadata.Item[0].Value;
      await mpesaCallback(paymentId);
    }

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