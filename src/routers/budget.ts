import { Router } from "express";
import { create } from "../services/budget";
import auth from "../middleware/auth";

const router = Router();

router.post("/", auth, create)

export default router;