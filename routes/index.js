import express from 'express';
import ProductRoutes from './ProductRoutes.js'
import UserRoutes from './UserRoutes.js'
const router = express.Router();

// Подключаем все роуты

router.use('/products', ProductRoutes);
router.use('/get-all', UserRoutes);

// Главный маршрут API
router.get('/', (req, res) => {
  res.json({
    message: 'API работает!',
    endpoints: {
      test: '/api/test/db',
      users: {
        add: 'POST /api/users/add',
        all: 'GET /api/users/all'
      },
      products: {
        list: 'GET /api/products',
        category: 'POST /api/products/category',
        property: 'POST /api/products/property'
      },
      upload: 'POST /api/upload'
    }
  });
});

export default router;