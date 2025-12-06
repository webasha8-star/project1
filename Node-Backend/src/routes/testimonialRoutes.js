
import express from "express";
import { createTestimonial, getTestimonials } from "../controllers/testimonialController.js";

const router = express.Router();

// Public routes
router.get("/", getTestimonials);
router.post("/", createTestimonial);

export default router;
