import express from 'express';

const router = express.Router();

router.post('/create', createNoticeController);

import {
  createNoticeController,
  getAllNotices,
  getNoticesByCategory,
  getNoticeById,
  updateNotice,
  deleteNotice,
} from '../Controllers/noticeController.js';

// Notice Routes
router.post('/', createNoticeController); // Create a new notice
router.get('/', getAllNotices); // Get all notices with optional filters
router.get('/category/:category', getNoticesByCategory); // Get notices by category
router.get('/:id', getNoticeById); // Get notice by MongoDB _id
router.put('/:id', updateNotice); // Update a notice
router.delete('/:id', deleteNotice); // Delete a notice

export default router;