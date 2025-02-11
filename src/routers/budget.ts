import { Router } from "express";
import auth from "../middleware/auth";
import { create, deleteBudgetService, getAll, getById, updateBudgetService } from "../services/budget";

const router = Router();

router.post("/", auth, create);
router.get("/", auth, getAll);
router.get("/", auth, getById);
router.put("/", auth, updateBudgetService);
router.delete("/:id", auth, deleteBudgetService)

export default router;