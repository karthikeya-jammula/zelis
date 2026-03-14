import cors from "cors";
import express from "express";
import { existsSync } from "fs";
import morgan from "morgan";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import testRoutes from "./routes/testRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "ai-test-generator-api" });
});

app.use("/api", testRoutes);

// Serve the built frontend in production
const clientDist = join(__dirname, "../../client/dist");
if (existsSync(clientDist)) {
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => {
    res.sendFile(join(clientDist, "index.html"), (err) => {
      if (err) res.status(500).send("Error serving the application.");
    });
  });
}

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

