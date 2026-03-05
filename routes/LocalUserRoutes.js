import express from 'express';
import { addRegisterUser } from '../controllers/LocalUser.js';
import { loginUser } from '../controllers/LocalUser.js';
const router = express.Router();

router.post('/register', addRegisterUser);
router.post('/login', loginUser )
export default router;