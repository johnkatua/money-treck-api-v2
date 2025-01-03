import { Router } from "express";
import { IUser } from "../models/User";
import { loginUser, registerUser } from "../controllers/user";
import auth, { CustomRequest } from "../middleware/auth";

const router = Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userData: Partial<IUser> = {
    name, email, password
  }

  const registeredUser = await registerUser(userData)
  if (registeredUser?.error) {
    return res.status(400).json({
      msg: registeredUser?.error
    })
  }

  return res.status(201).json(registeredUser)
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userData: Partial<IUser> = {
    email, password
  }

  const loggedInUser = await loginUser(userData)

  if (loggedInUser?.error) {
    return res.status(400).json({
      msg: loggedInUser?.error
    })
  }

  return res.status(200).json(loggedInUser)
})

export default router