import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => Array.isArray(value) && value.length === 4,
        message: "Question must include exactly four options.",
      },
    },
    correctAnswer: { type: String, required: true },
    explanation: { type: String, required: true },
    topic: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Question = mongoose.model("Question", questionSchema);
