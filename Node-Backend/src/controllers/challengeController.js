import prisma from "../config/db.js";

// Get all challenges
export const getChallenges = async (req, res) => {
    try {
        const challenges = await prisma.challenge.findMany();
        res.json(challenges);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch challenges" });
    }
};

// Get single challenge
export const getChallengeById = async (req, res) => {
    try {
        const challenge = await prisma.challenge.findUnique({
            where: { id: Number(req.params.id) },
        });
        if (!challenge) return res.status(404).json({ message: "Not found" });
        res.json(challenge);
    } catch (error) {
        res.status(500).json({ message: "Error fetching challenge" });
    }
};

// Create new challenge
export const createChallenge = async (req, res) => {
    const { title, desc, level, img } = req.body;
    try {
        const challenge = await prisma.challenge.create({
            data: { title, desc, level, img },
        });
        res.status(201).json(challenge);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating challenge" });
    }
};

// Update challenge
export const updateChallenge = async (req, res) => {
    const { title, desc, level, img } = req.body;
    try {
        const challenge = await prisma.challenge.update({
            where: { id: Number(req.params.id) },
            data: { title, desc, level, img },
        });
        res.json(challenge);
    } catch (error) {
        res.status(500).json({ message: "Error updating challenge" });
    }
};

// Delete challenge
export const deleteChallenge = async (req, res) => {
    try {
        await prisma.challenge.delete({ where: { id: Number(req.params.id) } });
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting challenge" });
    }
};


export const getUserQuestions = async (req, res) => {
    try {
        const questions = await prisma.fAQQuestion.findMany({
            where: { email: req.user.email },
            orderBy: { createdAt: "desc" },
        });

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
