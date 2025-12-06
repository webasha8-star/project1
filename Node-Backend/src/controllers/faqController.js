import prisma from "../config/db.js";

// Save user question
export const submitQuestion = async (req, res) => {
try {
const { email, question } = req.body;

const newQuestion = await prisma.fAQQuestion.create({
data: { email, question },
});

res.status(201).json({ message: "Question submitted successfully!", question: newQuestion });
} catch (error) {
res.status(500).json({ message: "Server error", error });
}
};

// Admin: Get all questions
export const getAllQuestions = async (req, res) => {
try {
const questions = await prisma.fAQQuestion.findMany({
orderBy: { createdAt: "desc" },
});

res.status(200).json(questions);
} catch (error) {
res.status(500).json({ message: "Server error", error });
}
};

// Admin: Reply to question
export const replyToQuestion = async (req, res) => {
try {
const { reply } = req.body;
const { id } = req.params;

const updated = await prisma.fAQQuestion.update({
where: { id: parseInt(id) },
data: {
reply,
status: "replied",
},
});

res.status(200).json({ message: "Reply sent!", updated });
} catch (error) {
res.status(500).json({ message: "Server error", error });
}
};



export const deleteQuestion = async (req, res) => {
try {
const { id } = req.params;
await prisma.fAQQuestion.delete({
where: { id: parseInt(id) },
});
res.status(200).json({ message: "Question deleted successfully!" });
} catch (error) {
res.status(500).json({ message: "Server error", error });
}
};

// User: Get only his/her submitted questions
export const getUserQuestions = async (req, res) => {
try {
const questions = await prisma.fAQQuestion.findMany({
where: { email: req.user.email },
orderBy: { createdAt: "desc" },
});

res.status(200).json(questions);
} catch (error) {
console.error(error);
res.status(500).json({ message: "Server error", error });
}
};
