import cors from "cors";
import express from "express";
import morgan from "morgan";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import testRoutes from "./routes/testRoutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "ai-test-generator-api" });
});

app.use("/api", testRoutes);

app.use((err, _req, res, _next) => {
  const status = err.response?.status || err.status || 500;
  const message =
    err.response?.data?.error?.message || err.message || "Internal server error";
  res.status(status).json({ error: message });
});

const start = async () => {
  await connectDb(env.mongoUri);
  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
};

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});

