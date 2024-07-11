import { Router } from "express";
import { login, register } from "../controllers/user.controller.js";

const router = Router();

// register route

router.post("/register", register);
router.post("/login", login);

export default router;
