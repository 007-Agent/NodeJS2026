import dotenv from 'dotenv';
import pool from '../db.js';  

// export async function AddUser(name, email, phone){
//   return async () => {
//     const client = await pool.connect();
//     try{
//         await client.query('CALL add_users($1, $2, $3)',[name, email, phone]);
//         return {success: true};
//     } catch (error) {
//       throw new Error(`Ошибка в модели: ${error.message}`);
//     } finally {
//       client.release();
//     }
// }
// }



export async function AddUser(name, email, phone) {
  try {
    console.log('Передаваемые данные в процедуру add_users:', );
    const query = 'CALL add_users($1, $2, $3)';
    const values = [name, email, phone];
    console.log('Передаваемые данные', values);
    const res = await pool.query(query, values);
//  INSERT INTO users (name, email, phone) VALUES (name_param, email_param, phone_param);
//     CALL add_users($1, $2, $3)
    return { success: true, message: 'Пользователь добавлен' };
  } catch (error) {
    console.error('Ошибка в AddUser:', error);  

    
    return { success: false, error: error.message };
  }
}