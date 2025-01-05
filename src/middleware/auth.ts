import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";

// export interface CustomRequest extends Request {
//   user?: IUser
//   token?: string
// }

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
    if (!token) {
      throw new Error('Authentication failed. Token missing.')
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY as string) as DecodedToken

    // const user = await User.findOne({
    //   _id: decoded._id,
    //   'tokens.token': token
    // })

    // if (!user) {
    //   throw new Error('Authentication failed. User not found.')
    // }

    // req.user = decoded;
    // req.token = token;
    next()
  } catch (error) {
    res.status(401).json({
      msg: 'Authentication failed.'
    })
  }
}

export default auth;