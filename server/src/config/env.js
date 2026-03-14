import dotenv from "dotenv";

dotenv.config();

if (!process.env.OPENROUTER_API_KEY) {
  console.warn(
    "Warning: OPENROUTER_API_KEY is not set. " +
      "Test generation will fail until a valid key is provided in server/.env."
  );
}

export const env = {
  port: Number(process.env.PORT || 5000),
  mongoUri: process.env.MONGODB_URI,
  openRouterApiKey: process.env.OPENROUTER_API_KEY,
  openRouterModel: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
  openRouterBaseUrl:
    process.env.OPENROUTER_BASE_URL ||
    "https://openrouter.ai/api/v1/chat/completions",
  siteUrl: process.env.OPENROUTER_SITE_URL || "http://localhost:5173",
  appName: process.env.OPENROUTER_APP_NAME || "AI Test Generator",
};
