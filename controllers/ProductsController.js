import pool from "../db.js";
import { someController } from "../models/Test.js";





export async function getProducts (req, res) {
  try {
    const result = await pool.query('SELECT * FROM products');
    console.log(result, "RRRRR")
    const baseUrl = 'http://127.0.0.1:3000';
    // const baseUrl = process.env.BASE_URL || ''; // Замените на ваш URL сервера, если нужно
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

export async function getProductCategory (req, res) {
  try {
    const { categoryId } = req.body;
      console.log('Получен categoryId:', categoryId);
     if (![1, 2, 3].includes(categoryId)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid category ID. Must be 1, 2, or 3'
        });
      }
   const result = await pool.query('SELECT * FROM get_products_by_category_functrue($1)', [categoryId]);
    console.log(result, "RRRRR")
    const baseUrl = 'http://192.168.254.135:3000'; // Замените на ваш URL сервера, если нужно
    // const baseUrl = process.env.BASE_URL || '';
    const products = result.rows.map(product => ({
      ...product,
      main_image: `${baseUrl}${product.main_image}`, // Полный URL изображения
    }));
   console.log(products, "PPRPR")
    res.json({ success: true, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
};

export async function getAllProperty (req, res) {
  try{
     console.log(req.body)
     const { moment_id, categoryId } = req.body;
     const result = await pool.query('select * from get_products_1212($1, $2)', [moment_id, categoryId])
      const baseUrl = 'http://192.168.254.135:3000';
      // const baseUrl = process.env.BASE_URL || '';
      const products = result.rows.map(product => ({
      ...product,
      main_image: `${baseUrl}${product.main_image}`,
      second_image: `${baseUrl}${product.second_image}`,
      third_image: `${baseUrl}${product.four_image}`,
      
      four_image: `${baseUrl}${product.four_image}`,
       // Полный URL изображения
    }));
       console.log('Получен categoryId:', categoryId);
     console.log(result, "RRRRR")
      res.json({ success: true, data: products });
  } catch (err){
    console.error(err);
    res.status(500).json({ success: false, error: 'Database error' });
  }
};