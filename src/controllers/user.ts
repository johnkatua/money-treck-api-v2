import User from "../models/user";
import { IUser } from "../models/user";

export const registerUser = async (user: Partial<IUser>) => {
  const { name, email, password } = user
  if (!name || !email || !password) {
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

  const newUser = new User({ name, email, password })
  await newUser.save()

  const token = await newUser.generateAuthToken()
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

  const existingUser = await User.findCredentials(email, password)
  if (!existingUser) {
    return null
  }

  const token = await existingUser.generateAuthToken()

  return {
    user: existingUser,
    token
  }
}