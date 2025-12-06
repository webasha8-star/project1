
import prisma from "../config/db.js";

export const createTestimonial = async (req, res) => {
  try {
    console.log("Incoming body:", req.body); 

    const { name, role, message, rating } = req.body;

    if (!name || !role || !message || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        message,
        rating: parseInt(rating),
      },
    });

    res.status(201).json(testimonial);
  } catch (error) {
    console.error("Error adding testimonial:", error);
    res.status(500).json({
      message: "Error adding testimonial",
      error: error.message,
    });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(testimonials);
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    res.status(500).json({
      message: "Error fetching testimonials",
      error: error.message,
    });
  }
};
