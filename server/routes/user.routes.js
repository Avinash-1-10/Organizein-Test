import { Router } from 'express';
import { login, logout, register } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();

// register route

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);

export default router;
