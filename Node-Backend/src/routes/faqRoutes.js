
import express from "express";
import {
submitQuestion,
getAllQuestions,
replyToQuestion,
getUserQuestions, // <-- add this import
deleteQuestion
} from "../controllers/faqController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public: User submits question
router.post("/submit", submitQuestion);

// User: See own submitted questions
router.get("/user/my", protect, getUserQuestions); // <-- ADD THIS LINE

// Admin: Get all questions
router.get("/admin/all", protect, admin, getAllQuestions);

// Admin: Reply to specific question
router.post("/admin/reply/:id", protect, admin, replyToQuestion);

// Admin: Delete question
router.post("/admin/delete/:id", protect, admin, deleteQuestion);

export default router;
