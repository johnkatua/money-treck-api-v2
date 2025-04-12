import { Response } from "express";
import { getUserById, updateUser } from "../controllers/user";
import { CustomRequest } from "../middleware/auth";
import { uploadAvatar } from "../utils/uploadFile";


export const getUser = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.user?._id;
  
    const data = await getUserById(id!);

    res.status(200).json({
      msg: "User fetched successfully",
      data: {
        name: data?.data?.name,
        email: data?.data?.email,
        phoneNumber: data?.data?.phoneNumber,
        currency: data?.data?.currency,
        avatar: data?.data?.avatar,
      }
    })

    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({
      msg: "Failed to fetch user",
      error: errorMessage
    })
  }
}

interface S3File extends Express.Multer.File {
  location?: string; // This property exists in multer-s3 uploads
  key?: string;
}

export const updateUserService = async (req: CustomRequest, res: Response) => {
  try {
    uploadAvatar(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ msg: `Error uploading file to s3 ${err}` });
      }

      const { currency, phoneNumber, name, email } = req.body;
      const id = req.user?._id;

      const avatar = (req.file as S3File)?.location;

      const userData = { currency, id, avatar, phoneNumber, name, email };
      const data = await updateUser(userData);

      res.status(200).json({ msg: "User updated successfully", data });
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ msg: "Failed to update user", error: errorMessage });
  }
};
