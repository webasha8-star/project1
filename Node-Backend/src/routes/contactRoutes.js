import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

// POST new contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = await prisma.contact.create({
      data: { name, email, message },
    });

    // Emit via Socket.IO to admins
    const io = req.app.get("io");
    io.emit("newContactMessage", newMessage);

    res.json(newMessage);
  } catch (err) {
    console.error("Error creating contact message:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// GET all contact messages
router.get("/", async (req, res) => {
  try {
    const messages = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

export default router;
