import express from 'express';
import pool from './db.js';  // Импорт из db.js — добавьте .js
import dotenv from 'dotenv';
dotenv.config();  
import multer from 'multer';
import { handleAddUser} from './controllers/UserControllers.js';
import { handlegetUsers } from './controllers/UserControllers.js';
import { getProducts } from './controllers/ProductsController.js';
import cors from 'cors';

const app = express();
app.use(express.json()); 

app.use(cors());
app.use('/uploads', express.static('uploads'));

const upload = multer({dest : 'uploads/'})

app.get('/test-db', async (req, res) => {
  try {
    // Ваш тест БД
    const testRes = await pool.query('SELECT 1 as test');
    res.json({ success: true, message: 'Соединение с БД ок!', result: testRes.rows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
    console.log("нет подключения!")
  }
});

app.post('/add-users', handleAddUser);

app.get('/all-users', handlegetUsers)
app.post('/api/upload', upload.single('file'), (res, req) => {
  res.setEncoding('Upload succesfully!!!')
})





app.get('/api/products', async (req, res) => {
 try {
    const result = await pool.query('SELECT id, name, article, price, photo_path FROM products');
    const products = result.rows.map((product) => {
      // Преобразуем BYTEA в base64
      const photoBase64 = product.photo_path ? product.photo_path.toString('base64') : null;
      return {
        id: product.id,
        name: product.name,
        article: product.article,
        price: product.price,
        photo: photoBase64,
      };
    });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});
app.get('/api/all_pgoto', getProducts)
// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});




