import express from 'express';
import userController from '../../controllers/userController.js';
import { authGuard } from '../../middlewares/authMiddleware.js';
import { requireRole } from '../../middlewares/roleMiddleware.js';

const router = express.Router();

// Public
router.post('/register', (req,res,next) => userController.register(req,res,next));
router.post('/login', (req,res,next) => userController.login(req,res,next));

// Protégé
router.get('/me', authGuard, (req,res,next) => userController.me(req,res,next));
router.get('/', authGuard, requireRole(['ADMIN']), (req,res,next) => userController.getAll(req,res,next));

export default router;