import mongoose from "mongoose";

const testPaperSchema = new mongoose.Schema(
  {
    topics: { type: [String], required: true },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    numberOfQuestions: { type: Number, required: true },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const TestPaper = mongoose.model("TestPaper", testPaperSchema);
