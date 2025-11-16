import express from 'express';
import {
  getCategories,
  createCategory,
} from '../controllers/categoryController.js';
import { validateCategory } from '../middleware/validation.js';

const router = express.Router();

router.route('/').get(getCategories).post(validateCategory, createCategory);

export default router;

