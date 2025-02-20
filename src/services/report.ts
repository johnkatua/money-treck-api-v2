import { Request, Response } from "express";
import { getRevenueTrends } from "../controllers/report"

export const revenueTrends = async (req: Request, res: Response) => {
  try {
    const data = await getRevenueTrends();

    res.status(201).json({
      msg: "Revenue trends fetched successfully",
      data
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    res.status(500).json({
      msg: "Failed to fetch revenue trends",
      error: errorMessage
    })
  }
}