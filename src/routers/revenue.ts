import { Router } from "express";
import auth from "../middleware/auth";
import { create, getAll } from "../services/revenue";

const router = Router();

// /api/revenues - Create a new revenue
router.post("/", auth, create)
router.get("/", auth, getAll)


export default router;