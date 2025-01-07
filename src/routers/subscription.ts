import { Router } from "express";
import { cancelSubscriptionService, create, getUserSubscriptionsService } from "../services/subscription";
import auth from "../middleware/auth";

const router: Router = Router();

router.post("/subscribe", auth, create);
router.get("/user/:user_id", auth, getUserSubscriptionsService);
router.patch("/cancel/:id", auth, cancelSubscriptionService)

export default router;