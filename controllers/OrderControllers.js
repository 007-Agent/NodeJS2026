import pool from "../db.js";
import { someController } from "../models/Test.js";


export const createOrder = async (req, res) => {
  try {
    const { id,name, email, phone, address, items } = req.body;
    


    if (!id || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Некорректные данные заказа' });
    }
    if (!name || !email || !address) {
      return res.status(400).json({ error: 'Имя, email и адрес обязательны' });
    }

    // Преобразуем массив товаров в JSON-строку (процедура ждёт JSONB)
    const itemsJson = JSON.stringify(
      items.map(({ product_id, quantity }) => ({ product_id, quantity }))
    );


    const result = await pool.query(
      `CALL create_order($1, $2, $3, $4, $5, $6::jsonb, null, null, null)`,
      [
        id,
        name,
        email,
        phone || null,
        address,
        itemsJson
      ]
    );

    // OUT-параметры возвращаются в первой строке результата
    const { out_order_id, out_order_number, out_total_amount } = result.rows[0];

    // --- Успешный ответ ---
    res.status(201).json({
      message: 'Заказ успешно создан',
      orderId: out_order_id,
      orderNumber: out_order_number,
      totalAmount: out_total_amount
    });

  } catch (error) {
    console.error('Ошибка при создании заказа:', error);

    // Если процедура выбросила исключение (например, товар не найден)
    if (error.message.includes('Товар с ID')) {
      return res.status(400).json({ error: error.message });
    }

    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const addFavoriteOwner = async(req, res) => {
  const {id, userId} = req.body;
   try{
    const result = await pool.query( `CALL add_like_product($1, $2)`, [id, userId])
    res.json(result.rows);
   } catch (error) {
      console.error('Ошибка добавления в избранное:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
   }
}

export const getAllOrders = async (req, res) => {
  const userId = req.user.userId; // из middleware authenticateToken

  try {
    // Вызываем функцию get_user_orders, которая возвращает заказы с товарами
    const result = await pool.query(
      'SELECT * FROM get_user_orders($1)',
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка получения заказов:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

export const payOrder = async (req, res) => {
  const userId = req.user.userId;
  const { orderId } = req.params;

  try {
    // Проверяем, что заказ принадлежит пользователю и ещё не оплачен
    const check = await pool.query(
      'SELECT id FROM orders WHERE id = $1 AND user_id = $2 AND payment_status = $3',
      [orderId, userId, 'pending']
    );
    if (check.rows.length === 0) {
      return res.status(404).json({ error: 'Заказ не найден или уже оплачен' });
    }

    // Обновляем статус
    await pool.query(
      `UPDATE orders 
       SET payment_status = 'paid', status = 'paid', paid_at = NOW() 
       WHERE id = $1`,
      [orderId]
    );

    res.json({ message: 'Заказ успешно оплачен' });
  } catch (error) {
    console.error('Ошибка оплаты заказа:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};