// routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import prisma from "../prismaClient.js";

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile-images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// POST /api/upload-profile/:id
router.post("/upload-profile/:id", upload.single("image"), async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const imagePath = `/uploads/profile-images/${req.file.filename}`;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { image: imagePath },
    });

    res.json({
      message: "Profile image uploaded successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Error uploading image" });
  }
});

export default router;
