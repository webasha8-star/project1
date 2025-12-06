import express from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware.js"; // your existing middlewares

const router = express.Router();
const prisma = new PrismaClient();

// ADMIN SENDS ANNOUNCEMENT
router.post("/", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message?.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const announcement = await prisma.announcement.create({
      data: { message },
    });

    // broadcast to all users via socket
    const io = req.app.get("io");
    io.emit("announcement:new", announcement);

    res.status(201).json({
      success: true,
      message: "Announcement sent successfully",
      announcement,
    });
  } catch (err) {
    console.error("Error sending announcement:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// USER FETCHES ANNOUNCEMENTS
router.get("/", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const announcements = await prisma.announcement.findMany({
      where: {
        OR: [{ userId }, { userId: null }], // personal + broadcast
      },
      orderBy: { createdAt: "desc" },
    });

    res.json(announcements);
  } catch (err) {
    console.error("Error fetching announcements:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// ADMIN DELETES ANNOUNCEMENT
router.delete("/:id", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Check if announcement exists
    const existing = await prisma.announcement.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    // Delete the announcement
    await prisma.announcement.delete({ where: { id } });

    // Notify all connected clients via Socket.IO
    const io = req.app.get("io");
    io.emit("announcement:deleted", id);

    res.json({ success: true, message: "Announcement deleted successfully" });
  } catch (err) {
    console.error("Error deleting announcement:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// MARK AS READ
router.put("/:id/read", authenticateUser, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const announcement = await prisma.announcement.update({
      where: { id },
      data: { isRead: true },
    });
    res.json({ success: true, announcement });
  } catch (err) {
    console.error("Error marking read:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
