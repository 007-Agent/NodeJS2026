import express from 'express';
import { createOrder } from '../controllers/OrderControllers.js';
import { getAllOrders } from '../controllers/OrderControllers.js';
import { authenticateToken } from '../middleware/auth.js';
import { payOrder } from '../controllers/OrderControllers.js';
const router = express.Router();

router.post('/create', createOrder )
router.get('/getorders', authenticateToken, getAllOrders);
router.patch('/:orderId/pay', authenticateToken, payOrder);
export default router;