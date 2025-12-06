// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import http from "http";
// import { Server } from "socket.io";
// import testimonialRoutes from "./routes/testimonialRoutes.js";

// import userRoutes from "./routes/userRoutes.js";
// import labRoutes from "./routes/labRoutes.js";
// import announcementRoutes from "./routes/announcementRoutes.js"; // our only route
// import contactRoutes from "./routes/contactRoutes.js";
// import challengeRoutes from "./routes/challengeRoutes.js";
// import faqRoutes from "./routes/faqRoutes.js";
// import path from "path";
// import uploadRoutes from "./routes/uploadRoutes.js";


// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/testimonials", testimonialRoutes);

// app.use("/api/faq", faqRoutes);
// // app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// // Serve static uploads
// app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// // Register upload route
// app.use("/api", uploadRoutes);


// // ======================================================
// // ROUTES
// // ======================================================
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// app.use("/api/users", userRoutes);
// app.use("/api/labs", labRoutes);
// app.use("/api/announcements", announcementRoutes); // single announcement system
// app.use("/api/contact", contactRoutes);







// // Register all API routes BEFORE 404 handler
// app.use("/api/users", userRoutes);
// app.use("/api/challenges", challengeRoutes);
// app.use("/api/faq", faqRoutes); // here before 404

// // ======================================================
// // SOCKET.IO SETUP
// // ======================================================
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// // Make io available to routes
// app.set("io", io);

// // Socket events
// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("join", (userId) => {
//     if (userId) {
//       socket.join(`user_${userId}`);
//       console.log(`User ${userId} joined room user_${userId}`);
//     }
//   });

//   // Contact Us real-time listener
//   socket.on("contactMessageSent", (msg) => {
//     console.log("New contact message received:", msg);
//     io.emit("newContactMessage", msg); // broadcast to all admins
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });


// // ======================================================
// // START SERVER
// // ======================================================
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () =>
//   console.log(`Server running on port ${PORT} with announcements + Socket.IO`)
// );

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import path from "path";

// Import Routes
import testimonialRoutes from "./routes/testimonialRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import labRoutes from "./routes/labRoutes.js";
import announcementRoutes from "./routes/announcementRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// Initialize and Config
dotenv.config();
const app = express();

// MIDDLEWARE
// ======================================================
app.use(cors());
app.use(express.json()); // Parses JSON body
app.use(express.urlencoded({ extended: true })); // Parses form data

// Serve uploaded files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// API ROUTES
app.get("/", (req, res) => {
  res.send("API is running successfully...");
});

// Register all routes
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/users", userRoutes);
app.use("/api/labs", labRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/faq", faqRoutes);
app.use("/api", uploadRoutes); // for uploads endpoint

// SOCKET.IO SETUP
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Make io accessible in routes if needed
app.set("io", io);

// Socket events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (userId) => {
    if (userId) {
      socket.join(`user_${userId}`);
      console.log(`👤 User ${userId} joined room user_${userId}`);
    }
  });

  // Contact message event
  socket.on("contactMessageSent", (msg) => {
    console.log("New contact message received:", msg);
    io.emit("newContactMessage", msg); // broadcast to admins
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// START SERVER
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT} with Socket.IO enabled`)
);
