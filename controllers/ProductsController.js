import pool from "../db.js";
import { someController } from "../models/Test.js";





export async function getProducts (req, res) {
  try {
    const result = await pool.query('SELECT * FROM products');
    console.log(result, "RRRRR")
    const baseUrl = 'http://10.16.1.66:3000'; // Замените на ваш URL сервера, если нужно
    const products = result.rows.map(product => ({
      ...product,
      photo_path: `${baseUrl}/${product.photo_path}`, // Полный URL изображения
    }));
   console.log(products, "PPRPR")
    res.json({ success: true, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
};