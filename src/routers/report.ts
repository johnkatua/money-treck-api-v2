import { Router } from "express";
import auth from "../middleware/auth";
import { budgetVsExpenses, financialOverview, revenueTrends } from "../services/report";

const router = Router();

router.get("/financial-overview", auth, financialOverview);
router.get("/budget-vs-expenditure", auth, budgetVsExpenses);
router.get("/revenue-trends", auth, revenueTrends);

export default router;