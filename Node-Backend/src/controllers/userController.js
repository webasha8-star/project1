// import prisma from "../config/db.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

// // REGISTER
// export const registerUser = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const userExists = await prisma.user.findUnique({ where: { email } });
//     if (userExists) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await prisma.user.create({
//       data: { username, email, password: hashedPassword, role: "USER" },
//     });


//     res.status(201).json({
//       id: user.id,
//       username: user.username,
//       email: user.email,
//       token: generateToken(user.id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // LOGIN
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await prisma.user.findUnique({ where: { email } });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     res.json({
//       id: user.id,
//       username: user.username,
//       email: user.email,
//       token: generateToken(user.id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ADMIN REGISTER
// export const registerAdmin = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     const userExists = await prisma.user.findUnique({ where: { email } });
//     if (userExists) return res.status(400).json({ message: "Admin already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const admin = await prisma.user.create({
//       data: { username, email, password: hashedPassword, role: "ADMIN" },
//     });


//     res.status(201).json({
//       id: admin.id,
//       username: admin.username,
//       email: admin.email,
//       role: admin.role,
//       token: generateToken(admin.id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ADMIN LOGIN
// export const loginAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await prisma.user.findUnique({ where: { email } });
//     if (!admin || admin.role !== "ADMIN")
//       return res.status(400).json({ message: "Invalid admin credentials" });

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid admin credentials" });

//     res.json({
//       id: admin.id,
//       username: admin.username,
//       email: admin.email,
//       role: admin.role,
//       token: generateToken(admin.id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // GET ALL USERS (Admin only)
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await prisma.user.findMany({
//       select: {
//         id: true,
//         username: true,
//         email: true,
//         role: true,
//         createdAt: true,
//       },
//     });

//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// TOKEN GENERATION (now includes role + email)
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, country } = req.body;

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        country, // Save country from signup
      },
    });

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      country: user.country,
      role: user.role,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// LOGIN USER
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (error) {
    console.error("Login User Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// REGISTER ADMIN
export const registerAdmin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "ADMIN", // admin role
      },
    });

    res.status(201).json({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin),
    });
  } catch (error) {
    console.error("Register Admin Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.user.findUnique({ where: { email } });
    if (!admin || admin.role !== "ADMIN")
      return res.status(400).json({ message: "Invalid admin credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid admin credentials" });

    res.json({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin),
    });
  } catch (error) {
    console.error("Login Admin Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET ALL USERS (Admin Only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extracted from token middleware
    const { username, email, country } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        email,
        country, // Now we save the country too
      },
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Profile update failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// GET LEADERBOARD (Dynamic Lab Completion Count)
export const getLeaderboard = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        submissions: {
          where: { status: "CORRECT" }, // count only correct lab attempts
        },
      },
    });

    const leaderboard = users.map((user) => ({
      id: user.id,
      username: user.username,
      country: user.country,
      image: user.image,
      completedLabsCount: user.submissions.length, //dynamic count
    }));

    // Sort in descending order
    leaderboard.sort((a, b) => b.completedLabsCount - a.completedLabsCount);

    res.json(leaderboard);
  } catch (error) {
    console.error("Leaderboard Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


