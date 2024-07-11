import { Router } from "express";
import { createForm } from "../controllers/form.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createForm);

export default router;
