import { Router } from "express";
import auth from "../middleware/auth";
import { create, getAll } from "../services/expenditure";

const router = Router();

router.post("/", auth, create);
router.get("/", auth, getAll);

export default router;