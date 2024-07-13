import { Router } from "express";
import {
  createForm,
  deleteForm,
  getAllForms,
  getUserForms,
} from "../controllers/form.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const router = Router();

router.post("/", authMiddleware, createForm);
router.get("/", authMiddleware, adminMiddleware, getAllForms);
router.get("/user", authMiddleware, getUserForms);
router.delete("/:id", authMiddleware, deleteForm);

export default router;
