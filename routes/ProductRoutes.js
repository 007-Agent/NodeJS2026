import express from 'express';
import { 
  getProducts, 
  getProductCategory, 
  getAllProperty 
} from '../controllers/ProductsController.js';

const router = express.Router();



// Получение продуктов по категории
router.post('/category', getProductCategory);

// Получение свойств продукта
router.post('/property', getAllProperty);

// Получение всех фото (ваш /api/all_pgoto)
router.get('/all_info', getProducts);

export default router;