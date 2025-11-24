import express from 'express';
import pool from './db.js';  // Импорт из db.js — добавьте .js
import dotenv from 'dotenv';
dotenv.config();  
import { handleAddUser} from './controllers/UserControllers.js';
import { handlegetUsers } from './controllers/UserControllers.js';
import cors from 'cors';

const app = express();
app.use(express.json()); 

app.use(cors());




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

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});