import { Router } from "express";
import { IUser } from "../interface/user";
import { loginUser, registerUser } from "../controllers/user";
import auth from "../middleware/auth";
import { getUser, refreshToken, updateUserService } from "../services/user";
// import auth, { CustomRequest } from "../middleware/auth";

const router = Router();

router.post("/register", async (req, res): Promise<any> => {
  const { name, email, password, phoneNumber, currency, avatar } = req.body;
  const userData: Partial<IUser> = {
    name, email, password, phoneNumber, currency, avatar
  }

  const registeredUser = await registerUser(userData)

  if (registeredUser.msg) {
    return res.status(400).json(registeredUser)
  }

  return res.status(201).json(registeredUser)
})

router.post("/login", async (req, res): Promise<any> => {
  const { email, password } = req.body;
  const userData: Partial<IUser> = {
    email, password
  }

  const loggedInUser = await loginUser(userData)

  return res.status(200).json(loggedInUser)
});

router.get("/me", auth, getUser)
router.put("/", auth, updateUserService)
router.get("/refresh-token", auth, refreshToken)

export default router
