import { Router } from "express";
import auth from "../middleware/auth";
import { createRevenue } from "../controllers/revenue";

const router = Router();

// Post /api/revenues - Create a new revenue
router.post("/", auth, createRevenue)

export default router;