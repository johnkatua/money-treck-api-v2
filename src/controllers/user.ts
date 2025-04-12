import User from "../models/user";
import { IUser } from "../interface/user";
import jwt from "jsonwebtoken";

const generateAuthToken = async (user: IUser) => { 
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY as string, {
    expiresIn: '7d'
  })
  return token
};

export const registerUser = async (user: Partial<IUser>) => {
  const { name, email, password, phoneNumber, currency, avatar } = user
  if (!name || !email || !password || !phoneNumber || !currency || !avatar) {
    return {
      msg: "Please provide all the required fields."
    }
  }

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return {
      msg: "User with that email already exists."
    }
  }

  const newUser = new User({ name, email, password, phoneNumber, currency, avatar })
  await newUser.save()

  const token = await generateAuthToken(user as IUser)  
  return {
    user: newUser,
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