const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const users = []; // In-memory хранилище пользователей, заменить на базу данных в будущем

// Регистрация пользователя
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Проверка существования пользователя
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: Date.now(), // Для демонстрации; в реальном проекте используй базу данных для генерации ID
        name,
        email,
        password: hashedPassword
    };
    users.push(newUser);

    // Генерация JWT-токена
    const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(201).json({
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
        token
    });
});

// Вход пользователя
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Поиск пользователя по email
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    // Сравнение паролей
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    // Генерация JWT-токена
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({
        user: { id: user.id, name: user.name, email: user.email },
        token
    });
});

// Получение данных текущего пользователя (защищённый маршрут)
const authMiddleware = require('../middleware/authMiddleware');
router.get('/me', authMiddleware, (req, res) => {
    // req.user устанавливается в middleware
    const user = users.find(user => user.id === req.user.id);
    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json({ id: user.id, name: user.name, email: user.email });
});

module.exports = router;
