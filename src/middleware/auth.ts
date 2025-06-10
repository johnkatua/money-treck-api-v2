import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  user?: {
    _id: string
  }
}

interface DecodedToken {
  _id: string
}

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {

    const token = req.header('Authorization')?.replace('Bearer ', '')
    console.log({ token })
    if (!token) {
      throw new Error('Authentication failed. Token missing.')
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY as string) as DecodedToken

    req.user = decoded;

    // const { data } = await getUserById(req.user._id)
    // if (data?.role == 'user' && data.is_subscribed == false) {
    //   res.status(401).json({
    //     msg: 'Please check your subscription status'
    //   })
    //   return
    // }
    next()
  } catch (error) {
    res.status(401).json({
      msg: 'Authentication failed.'
    })
  }
}

export default auth;