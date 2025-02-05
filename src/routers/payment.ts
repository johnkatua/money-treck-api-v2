import { Router } from "express";
import auth from "../middleware/auth";
import { mpesaCallbackService } from "../services/payment";

const router: Router = Router();

router.post("/mpesa/callback", mpesaCallbackService)

export default router;