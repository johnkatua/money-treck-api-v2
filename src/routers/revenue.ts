import { Router } from "express";
import auth from "../middleware/auth";
import { create } from "../services/revenue";

const router = Router();

// Post /api/revenues - Create a new revenue
router.post("/", auth, create)

export default router;