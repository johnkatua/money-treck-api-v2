import { Router } from "express";
import { create, getAll } from "../services/budget";
import auth from "../middleware/auth";

const router = Router();

router.post("/", auth, create)
router.get("/", auth, getAll);

export default router;