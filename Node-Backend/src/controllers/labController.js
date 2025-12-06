import prisma from "../config/db.js";
// 1️ Get all labs (with modules + questions)
export const getLabs = async (req, res) => {
  try {
    const labs = await prisma.lab.findMany({
      orderBy: { displayOrder: "asc" }, // Keep labs in correct order
      include: {       
        modules: {           
          include: { questions: true },
        },
      },
    });

    res.json(labs);
  } catch (error) {
    console.error("Error fetching labs:", error);
    res.status(500).json({ message: "Error fetching labs" });
  }
};

export const getLabById = async (req, res) => {
  try {
    const orderNumber = Number(req.params.id); // frontend /labs/:id → displayOrder

    if (isNaN(orderNumber)) {
      return res.status(400).json({ message: "Invalid lab ID" });
    }

    //  Fetch lab by displayOrder
    const lab = await prisma.lab.findFirst({
      where: { displayOrder: orderNumber },
      include: {
        modules: { include: { questions: true } },
      },
    });

    if (!lab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    //  Count total labs
    const totalLabs = await prisma.lab.count();

    //  Determine if this is the last lab
    const isLastLab = orderNumber === totalLabs;

    //  Send extra property to frontend
    res.json({ ...lab, isLastLab });

  } catch (error) {
    console.error("Error fetching lab by order:", error);
    res.status(500).json({ message: "Error fetching lab" });
  }
};

export const submitAnswers = async (req, res) => {
  try {
    const { userId, answers } = req.body;

    if (!userId || !answers || answers.length === 0) {
      return res.status(400).json({ message: "Invalid submission data" });
    }

    const submissions = await Promise.all(
      answers.map(async (ans) => {
        const questionId = Number(ans.questionId);

        // 1️ Check if already submitted
        const existing = await prisma.submission.findFirst({
          where: {
            userId,
            questionId,
          },
        });

        if (existing) {
          return {
            questionId,
            alreadySubmitted: true,
          };
        }

        // 2️ Fetch correct answer
        const question = await prisma.question.findUnique({
          where: { id: questionId },
          select: { answer: true },
        });

        if (!question) {
          throw new Error(`Question with ID ${questionId} not found`);
        }

        const isCorrect =
          ans.selected?.trim().toLowerCase() ===
          question.answer?.trim().toLowerCase();

        // 3️ Create *new* submission
        const newSubmission = await prisma.submission.create({
          data: {
            userId,
            questionId,
            selected: ans.selected,
            status: isCorrect ? "CORRECT" : "WRONG",
          },
        });

        return newSubmission;
      })
    );

    res.json({
      message: "Submission processed",
      submissions,
    });
  } catch (error) {
    console.error("Error saving submissions:", error);
    res.status(500).json({ message: "Error saving submission" });
  }
};


export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await prisma.submission.findMany({
      include: {
        user: {
          select: { id: true, username: true, email: true },
        },
        question: {
          include: {
            module: {
              include: {
                lab: { select: { title: true } },
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    console.log("Admin Request User:", req.user); // add this
    console.log("Total Submissions Fetched:", submissions.length); // add this

    res.status(200).json(submissions || []);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({
      message: "Failed to load submissions",
      error: error.message,
    });
  }
};


// 5️ Create Lab with Modules + Questions (auto-order)
export const createLabWithModules = async (req, res) => {
  try {
    const { title, summary, image, modules } = req.body;

    if (!title || !modules?.length) {
      return res.status(400).json({ message: "Title and modules are required" });
    }

    // Find highest displayOrder
    const lastLab = await prisma.lab.findFirst({
      orderBy: { displayOrder: "desc" },
    });

    const nextOrder = lastLab ? lastLab.displayOrder + 1 : 1;

    const lab = await prisma.lab.create({
      data: {
        title,
        summary,
        image,
        displayOrder: nextOrder,
        modules: {
          create: modules.map((mod) => ({
            title: mod.title,
            questions: {
              create: mod.questions.map((q) => ({
                text: q.text,
                options: q.options,
                answer: q.answer,
              })),
            },
          })),
        },
      },
      include: { modules: { include: { questions: true } } },
    });

    res.status(201).json({ message: "Lab created successfully", lab });
  } catch (error) {
    console.error("Error creating lab:", error);
    res.status(500).json({ message: "Server error creating lab" });
  }
};

// ======================================================
// 6️ DELETE LAB — reorder remaining labs automatically
// ======================================================
export const deleteLab = async (req, res) => {
  try {
    const labId = parseInt(req.params.id);

    const labToDelete = await prisma.lab.findUnique({
      where: { id: labId },
    });

    if (!labToDelete) {
      return res.status(404).json({ message: "Lab not found" });
    }

    const deletedOrder = labToDelete.displayOrder;

    // Delete submissions linked to this lab
    await prisma.submission.deleteMany({
      where: { question: { module: { labId } } },
    });

    // Delete related questions & modules
    await prisma.question.deleteMany({ where: { module: { labId } } });
    await prisma.module.deleteMany({ where: { labId } });
    await prisma.lab.delete({ where: { id: labId } });

    // Shift order for remaining labs
    await prisma.lab.updateMany({
      where: { displayOrder: { gt: deletedOrder } },
      data: { displayOrder: { decrement: 1 } },
    });

    res.json({ message: "Lab deleted and reordered successfully" });
  } catch (error) {
    console.error("Error deleting lab:", error);
    res.status(500).json({ message: "Failed to delete lab", error: error.message });
  }
};

// ======================================================
// 7️ DELETE MODULE — cascade delete its questions + submissions
// ======================================================
export const deleteModule = async (req, res) => {
  try {
    const moduleId = parseInt(req.params.id);

    await prisma.submission.deleteMany({ where: { question: { moduleId } } });
    await prisma.question.deleteMany({ where: { moduleId } });
    await prisma.module.delete({ where: { id: moduleId } });

    res.json({ message: "Module and its questions deleted successfully" });
  } catch (error) {
    console.error("Error deleting module:", error);
    res.status(500).json({ message: "Failed to delete module", error: error.message });
  }
};

// ======================================================
// 8️ DELETE QUESTION — cascade delete submissions
// ======================================================
export const deleteQuestion = async (req, res) => {
  try {
    const questionId = parseInt(req.params.id);

    await prisma.submission.deleteMany({ where: { questionId } });
    await prisma.question.delete({ where: { id: questionId } });

    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Failed to delete question", error: error.message });
  }
};
export const getUserSubmittedQuestions = async (req, res) => {
  try {
    const { userId, labId } = req.params;

    // labId from frontend = displayOrder, not actual labId
    const lab = await prisma.lab.findFirst({
      where: { displayOrder: Number(labId) },
      select: { id: true }
    });

    if (!lab) {
      return res.status(404).json({ message: "Lab not found" });
    }

    const submissions = await prisma.submission.findMany({
      where: {
        userId: Number(userId),
        question: {
          module: {
            labId: lab.id, // ← REAL LAB ID
          },
        },
      },
      select: {
        questionId: true,
        question: {
          select: { moduleId: true }
        }
      }
    });

    const formatted = submissions.map(s => ({
      moduleId: s.question.moduleId,
      questionId: s.questionId
    }));

    res.json(formatted);

  } catch (error) {
    console.error("Error fetching submitted questions:", error);
    res.status(500).json({ message: "Server error" });
  }
};
