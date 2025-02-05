import { Router } from "express";
import { mpesaCallbackService } from "../services/payment";

const router: Router = Router();

router.post("/mpesa/callback", mpesaCallbackService)

export default router;