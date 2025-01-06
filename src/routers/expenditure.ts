import { Router } from "express";
import auth from "../middleware/auth";
import { create } from "../services/expenditure";

const router = Router();

router.post("/", auth, create);

export default router;