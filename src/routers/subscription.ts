import { Router } from "express";
import { create, getUserSubscriptionsService } from "../services/subscription";
import auth from "../middleware/auth";

const router: Router = Router();

router.post("/subscribe", auth, create);
router.get("/user/:user_id", auth, getUserSubscriptionsService)

export default router;