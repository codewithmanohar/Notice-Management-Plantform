import express from 'express';
import { checkController } from '../Controllers/authController.js';
import { protectedRoute } from '../Middlewares/authMiddleware.js';

const router = express.Router();

// checking token 
router.get('/check', protectedRoute, checkController);

export default router;