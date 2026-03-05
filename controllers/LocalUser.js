import pool from "../db.js";
import { someController } from "../models/Test.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SALT_ROUNDS = 10;
export async function addRegisterUser (req, res) {
    try{
        const { email, password, name, phone, address, city  } = req.body;
        console.log('extracted:', { email, password, name, phone, address, city });
         if (!name || !email || !password) {
    return res.status(400).json({ error: 'Имя, email и пароль обязательны' });
  }
   const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query(
    'CALL add_register_user($1, $2, $3, $4, $5, $6)',
    [name, email, phone || null, city || null, address || null, hashedPassword]
)
    

    res.status(201).json({
      message: 'Регистрация прошла успешно',
      
    });
    } catch (error) {
        console.error('Ошибка при регистрации:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
    }
}

export async function loginUser (req, res) {
  try {
    const { email, password } = req.body;
    console.log('extracted:', { email, password });
    const result = await pool.query('SELECT * FROM get_now_user($1, $2)', 
        [email, password]
    )
    
     if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    const { password_hash, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword, token });
  } catch (error) {
     console.error('Login error:', error);
    res.status(500).json({ error: 'пользователь не получен!' });
  }
}