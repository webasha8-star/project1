
import express from "express";
import {
  getLabs,
  getLabById,
  submitAnswers,
  getAllSubmissions,
  createLabWithModules,
  deleteLab,
  deleteModule,
  deleteQuestion,
  getUserSubmittedQuestions, // NEW IMPORT
} from "../controllers/labController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ================== LAB ROUTES ==================
router.get("/", getLabs);

// Check which questions user already submitted
router.get("/submitted/:userId/:labId", protect, getUserSubmittedQuestions);

router.get("/submissions", protect, admin, getAllSubmissions);

router.get("/:id", getLabById);

router.post("/submit", protect, submitAnswers);

router.post("/create", protect, admin, createLabWithModules);

// ================== DELETE ROUTES ==================

// Delete entire lab
router.delete("/:id", protect, admin, deleteLab);

// Delete specific module inside a lab
router.delete("/modules/:id", protect, admin, deleteModule);

// Delete specific question inside a module
router.delete("/questions/:id", protect, admin, deleteQuestion);

export default router;
