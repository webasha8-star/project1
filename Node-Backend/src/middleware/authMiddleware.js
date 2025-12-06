import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

// Verify token and attach user to request
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, username: true, email: true, role: true },
      });

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Token validation error:", error.message);
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

// Check for admin role (case-insensitive)
export const admin = (req, res, next) => {
  if (req.user?.role?.toUpperCase() === "ADMIN") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Admin only" });
  }
};

// Alias exports for announcement routes compatibility
export { protect as authenticateUser, admin as authorizeAdmin };
