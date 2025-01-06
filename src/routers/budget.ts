import { Router } from "express";
import { create, getAll, getById } from "../services/budget";
import auth from "../middleware/auth";

const router = Router();

router.post("/", auth, create);
router.get("/", auth, getAll);
router.get("/", auth, getById)

export default router;