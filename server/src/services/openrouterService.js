import axios from "axios";
import { env } from "../config/env.js";
import { extractJson } from "../utils/jsonExtractor.js";

const buildPrompt = ({ topics, difficulty, numberOfQuestions }) => `
Generate ${numberOfQuestions} multiple-choice questions using these syllabus topics:
${topics.map((topic, index) => `${index + 1}. ${topic}`).join("\n")}

Difficulty level: ${difficulty}

Rules:
- Return ONLY valid JSON and no extra text.
- JSON schema:
{
  "questions": [
    {
      "question": "string",
      "options": ["option A", "option B", "option C", "option D"],
      "correctAnswer": "must exactly match one option",
      "explanation": "short explanation",
      "topic": "topic name",
      "difficulty": "${difficulty}"
    }
  ]
}
- Exactly 4 options per question.
- Ensure diverse questions across provided topics.
`.trim();

export const generateQuestionsWithAi = async ({
  topics,
  difficulty,
  numberOfQuestions,
}) => {
  const prompt = buildPrompt({ topics, difficulty, numberOfQuestions });

  const response = await axios.post(
    env.openRouterBaseUrl,
    {
      model: env.openRouterModel,
      messages: [
        {
          role: "system",
          content:
            "You are a strict JSON API. Return only JSON with no markdown.",
        },
        { role: "user", content: prompt },
      ],
      temperature: difficulty === "Advanced" ? 0.8 : 0.5,
    },
    {
      timeout: 60000,
      headers: {
        Authorization: `Bearer ${env.openRouterApiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": env.siteUrl,
        "X-Title": env.appName,
      },
    }
  );

  const content = response?.data?.choices?.[0]?.message?.content;
  const parsed = extractJson(content);
  const questions = parsed?.questions;

  if (!Array.isArray(questions) || questions.length !== numberOfQuestions) {
    throw new Error(
      "AI returned invalid question count or malformed questions array."
    );
  }

  return questions.map((item) => ({
    question: String(item.question || "").trim(),
    options: Array.isArray(item.options)
      ? item.options.map((opt) => String(opt).trim()).slice(0, 4)
      : [],
    correctAnswer: String(item.correctAnswer || "").trim(),
    explanation: String(item.explanation || "").trim(),
    topic: String(item.topic || "General").trim(),
    difficulty,
  }));
};
