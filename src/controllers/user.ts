import User from "../models/user";
import { IUser } from "../interface/user";
import jwt from "jsonwebtoken";

const generateAuthToken = async (user: IUser) => { 
  if (!user) {
    return null
  }
  console.log({
    expiresIn: process.env.JWT_EXPIRATION,
  })
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY as string, {
    expiresIn: process.env.JWT_EXPIRATION
  });
  return token
};

export const registerUser = async (user: Partial<IUser>) => {
  const { name, email, password, phoneNumber } = user
  if (!name || !email || !password || !phoneNumber) {
    return {
      msg: "Please provide all the required fields.",
      success: false
    }
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return {
      msg: "User with that email already exists."
    }
  }

  

  const token = await generateAuthToken(user as IUser)  

  if (!token) {
    return {
      msg: "Unable to generate token."
    }
  }

  const newUser = new User({ name, email, password, phoneNumber })
  await newUser.save()

  return {
    user: {
      name: newUser.name,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      id: newUser._id,
    },
    expiresIn: process.env.JWT_EXPIRATION,
    token
  }
}

export const loginUser = async (user: Partial<IUser>) => {
  const { email, password } = user;
  if (!email || !password) {
    return {
      msg: "Please provide all the required fields"
    }
  }

  const existingUser = await User.findByCredentials(email, password)
  if (!existingUser) {
    return null
  }

  const token = await generateAuthToken(user as IUser)

  return {
    user: existingUser,
    token
  }
}

export const getUserById = async (id: string) => {
  try {
    const data = await User.findById(id);
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}

export const updateUser = async (user: Partial<IUser>) => {
  const { id } = user;
  try {
    const data = await User.findByIdAndUpdate(
      id,
      { ...user },
      { new: true }
    )
    return { data, success: true }
  } catch (error) {
    return { data: null, success: false, error }
  }
}