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

    // Генерация JWT-токена
    const token = jwt.sign(
        { id: newUser.id, email: newUser.email },
        process.env.JWT_SECRET,
        { expiresIn: '31d' }
    );
    newUser.token = token;

    users.push(newUser);

    res.status(201).json({
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
        token,
        isLoggedIn: true
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

    res.json({
        user: { id: user.id, name: user.name, email: user.email },
        token: user.token,
        isLoggedIn: true
    });
});

router.post('/checkToken', async (req, res) => {
    const { email, token } = req.body;

    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'Неверные учетные данные' });
    }

    // Сравнение паролей
    const isMatch = token === user.token;
    if (!isMatch) {
        return res.status(400).json({ message: 'Токен устарел' });
    }

    res.json({
        user: { id: user.id, name: user.name, email: user.email },
        isLoggedIn: true
    });
});


module.exports = router;
