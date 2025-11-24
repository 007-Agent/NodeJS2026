import pool from '../db.js';  // Путь к вашему пулу

export async function someController(req, res) {
  try {

    const testRes = await pool.query('SELECT 1 as test');
    console.log('Соединение с БД установлено! Результат теста:', testRes.rows);

    

  } catch (error) {
    console.error('Ошибка соединения с БД:', error.message);
    return res.status(500).json({ success: false, error: 'Не удалось подключиться к БД' });
  }
}