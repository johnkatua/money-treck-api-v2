import { Router } from "express";
import { createPlan, getAllPlans, getPlanById } from "../controllers/plan";
import auth from "../middleware/auth";

const router = Router()

router.post("/", auth, createPlan)
router.get("/", auth, getAllPlans)
router.get("/:id", auth, getPlanById)