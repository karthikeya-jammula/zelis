export const extractJson = (text) => {
  if (!text || typeof text !== "string") {
    throw new Error("AI response is empty or invalid.");
  }

  const trimmed = text.trim();

  if (trimmed.startsWith("{")) {
    return JSON.parse(trimmed);
  }

  const codeFenceMatch = trimmed.match(/```json\s*([\s\S]*?)\s*```/i);
  if (codeFenceMatch?.[1]) {
    return JSON.parse(codeFenceMatch[1]);
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const maybeJson = trimmed.slice(firstBrace, lastBrace + 1);
    return JSON.parse(maybeJson);
  }

  throw new Error("Could not extract valid JSON from AI response.");
};
