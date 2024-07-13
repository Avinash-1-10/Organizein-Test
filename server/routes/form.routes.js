import { Router } from 'express';
import {
  createForm,
  deleteForm,
  getAllForms,
  getFormById,
  getUserForms,
  updateForm,
} from '../controllers/form.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import adminMiddleware from '../middlewares/admin.middleware.js';

const router = Router();

router.post('/', authMiddleware, createForm);
router.get('/', authMiddleware, adminMiddleware, getAllForms);
router.get('/id/:id', authMiddleware, getFormById);
router.get('/user', authMiddleware, getUserForms);
router.put('/:id', authMiddleware, updateForm)
router.delete('/:id', authMiddleware, deleteForm);

export default router;
