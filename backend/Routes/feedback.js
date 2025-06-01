import express from 'express';
import { createFeedback } from '../Controllers/feedbackContoller.js';

const router = express.Router();

// creating feedback 
router.post("/create" , createFeedback);

export default router;