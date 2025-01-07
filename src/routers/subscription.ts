import { Router } from "express";
import { create } from "../services/subscription";
import auth from "../middleware/auth";

const router: Router = Router();

router.post("/subscribe", auth, create);

export default router;