import express from 'express';
import { createOrder } from '../controllers/OrderControllers.js';
import { getAllOrders } from '../controllers/OrderControllers.js';
import { authenticateToken } from '../middleware/auth.js';
import { addFavoriteOwner } from '../controllers/OrderControllers.js';
import { payOrder } from '../controllers/OrderControllers.js';
const router = express.Router();

router.post('/create', createOrder )
router.post('/favorite', addFavoriteOwner);
router.get('/getorders', authenticateToken, getAllOrders);
router.patch('/:orderId/pay', authenticateToken, payOrder);
export default router;