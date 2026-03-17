import express from 'express';
import { addRegisterUser } from '../controllers/LocalUser.js';
import { loginUser } from '../controllers/LocalUser.js';
import { authenticateToken } from '../middleware/auth.js';
import { getUserProfile } from '../controllers/LocalUser.js';
const router = express.Router();

router.post('/register', addRegisterUser);
router.post('/login', loginUser )
router.get('/profile', authenticateToken, getUserProfile);

export default router;