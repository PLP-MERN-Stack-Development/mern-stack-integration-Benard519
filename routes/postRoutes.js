import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/postController.js';
import { validatePost } from '../middleware/validation.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// For file uploads, use multer; for URL-based images, use regular validation
router.route('/').get(getPosts).post(
  upload.single('featuredImage'),
  validatePost,
  createPost
);
router
  .route('/:id')
  .get(getPost)
  .put(
    upload.single('featuredImage'),
    validatePost,
    updatePost
  )
  .delete(deletePost);

export default router;

