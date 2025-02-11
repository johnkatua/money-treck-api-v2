import { Router } from "express";
import auth from "../middleware/auth";
import { create, deleteExpenditureService, getAll, updateExpenditureService } from "../services/expenditure";

const router = Router();

router.post("/", auth, create);
router.get("/", auth, getAll);
router.put("/", auth, updateExpenditureService);
router.delete("/:id", auth, deleteExpenditureService);

export default router;