import { Question } from "../models/Question.js";
import { TestPaper } from "../models/TestPaper.js";
import { generateQuestionsWithAi } from "../services/openrouterService.js";

const validDifficulties = ["Beginner", "Intermediate", "Advanced"];

export const createTest = async (req, res, next) => {
  try {
    const { topics, difficulty, numberOfQuestions } = req.body;

    if (!Array.isArray(topics) || topics.length === 0) {
      return res.status(400).json({ error: "At least one topic is required." });
    }

    if (!validDifficulties.includes(difficulty)) {
      return res.status(400).json({ error: "Invalid difficulty level." });
    }

    if (
      !Number.isInteger(numberOfQuestions) ||
      numberOfQuestions < 1 ||
      numberOfQuestions > 50
    ) {
      return res.status(400).json({
        error: "Number of questions must be an integer between 1 and 50.",
      });
    }

    const cleanedTopics = topics
      .map((topic) => String(topic || "").trim())
      .filter(Boolean);

    const aiQuestions = await generateQuestionsWithAi({
      topics: cleanedTopics,
      difficulty,
      numberOfQuestions,
    });

    const persistedQuestions = await Question.insertMany(aiQuestions);

    const paper = await TestPaper.create({
      topics: cleanedTopics,
      difficulty,
      numberOfQuestions,
      questions: persistedQuestions.map((q) => q._id),
    });

    const fullPaper = await TestPaper.findById(paper._id)
      .populate("questions")
      .lean();

    return res.status(201).json(fullPaper);
  } catch (error) {
    return next(error);
  }
};

export const listTests = async (_req, res, next) => {
  try {
    const tests = await TestPaper.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("questions")
      .lean();

    return res.json(tests);
  } catch (error) {
    return next(error);
  }
};
