import { Response } from "express";
import { getUserById } from "../controllers/user";
import { CustomRequest } from "../middleware/auth";


export const getUser = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.user?._id;
  

    const data = await getUserById(id!);

    res.status(200).json({
      msg: "User fetched successfully",
      data
    })

    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: "Failed to fetch user",
      error: errorMessage
    })
  }
}