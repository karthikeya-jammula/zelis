import dotenv from "dotenv";

dotenv.config();

const required = ["OPENROUTER_API_KEY"];

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
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
