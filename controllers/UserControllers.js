import {AddUser} from "../models/User.js"
import pool from "../db.js";
import { someController } from "../models/Test.js";
export async function handleAddUser(req, res) {
  try {
    const { name, email, phone } = req.body;
    console.log('Получен запрос на добавление пользователя');
    console.log('req.body:', req.body);
    
    const result = await AddUser(name, email, phone);
    console.log('Тип result:', typeof result);
    console.log(result.success)
    if (result.success) {
      res.status(201).json({ success: true, message: 'Пользователь добавлен успешно' });
    } else {
      res.status(500).json({ error: 'Не удалось добавить пользователя' });
    }
  } catch (error) {
    console.error('Ошибка в контроллере:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}

// export async function handlegetUsers (req, res)  {
//   try {
//     const result = await pool.query('select * from users');
//     res.status(200).json(result.rows);
//     console.log(result.rows)
//     // const arr = [];
//     // result.rows.forEach(element => {
//     //     const res = element.first_name;
//     //     arr.push(res);     
//     // });
//     // res.status(200).json({
//     //   arr
//     // });
 
//   } catch (error) {
//     console.log("ошибка в контроллере!")
//     console.error("Детали ошибки:", error);
//     res.status(500).json({ message: 'Ошибка при получении пользователей', error: error.message });
//   }
// };

export async function handlegetUsers(req, res) {
  try {
    console.log('Начало запроса к БД: получение пользователей');  // Лог перед запросом
    
    const result = await pool.query('select * from users');
    
    console.log('Запрос выполнен успешно:', result.rows.length, 'записей получено');  // Лог после успешного запроса
    res.status(200).json(result.rows);
    
  } catch (error) {
    console.log("Ошибка в контроллере!");
    console.error("Детали ошибки:", error);
    res.status(500).json({ message: 'Ошибка при получении пользователей', error: error.message });
  }
};