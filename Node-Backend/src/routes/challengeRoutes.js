
import express from "express";
import {
    getChallenges,
    getChallengeById,
    createChallenge,
    updateChallenge,
    deleteChallenge,
} from "../controllers/challengeController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getChallenges);
router.get("/:id", getChallengeById);

// Admin routes
router.post("/", protect, admin, createChallenge);
router.put("/:id", protect, admin, updateChallenge);
router.delete("/:id", protect, admin, deleteChallenge);

export default router;
