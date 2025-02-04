import { Response } from "express";
import { getUserById, updateUser } from "../controllers/user";
import { CustomRequest } from "../middleware/auth";
import { uploadAvatar } from "../utils/uploadFile";
import { IUser } from "../interface/user";


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

export const updateUserService = async (req: CustomRequest, res: Response) => {
  try {
    uploadAvatar(req, res, async (err) => {
      if (err) {
        return res.status(500).json({
          msg: `Error uploading file to s3 ${err}`
        })
      }
    })
    const { currency } = req.body;
    const id = req.user?._id;
    const avatar = req.file?.originalname


    const userData = {
      currency, id, avatar
    }

    const data = await updateUser(userData)

    res.status(200).json({
      msg: "User updated successfully",
      data
    })


  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: "Failed to update user",
      error: errorMessage
    })
  }
}