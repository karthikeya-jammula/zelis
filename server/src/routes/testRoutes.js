import { Router } from "express";
import { createTest, listTests } from "../controllers/testController.js";

const router = Router();

router.get("/tests", listTests);
router.post("/tests", createTest);

export default router;
