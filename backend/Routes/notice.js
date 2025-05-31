import express from 'express';
import { createNoticeController } from '../Controllers/noticeController.js';

const router = express.Router();

router.post('/create', createNoticeController);

export default router;