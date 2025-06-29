import { Router } from "express";
import { createChallenge, deleteChallenge, getChallengeById, getChallenges, joinChallenge, leaveChallenge, updateChallenge } from "../controllers/challenge";
import auth from "../middleware/auth";

const router = Router();

router.post("/", auth, createChallenge);
router.get("/", auth, getChallenges);
router.get("/:id", getChallengeById);
router.put("/:id", updateChallenge);
router.delete("/:id", deleteChallenge);
router.put("/:id/join", joinChallenge);
router.post("/:id/leave", leaveChallenge);

export default router;