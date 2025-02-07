import { Router } from "express";
import auth from "../middleware/auth";
import { create, deleteRevenueService, getAll, updateRevenueService } from "../services/revenue";

const router = Router();

router.post("/", auth, create)
router.get("/", auth, getAll)
router.put("/", auth, updateRevenueService);
router.delete("/:id", auth, deleteRevenueService);


export default router;