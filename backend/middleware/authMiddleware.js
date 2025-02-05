const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Ожидается, что заголовок Authorization имеет формат: Bearer <token>
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Нет токена, доступ запрещен' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Нет токена, доступ запрещен' });
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET); // Добавляем данные пользователя в запрос
        next();
    } catch (error) {
        res.status(401).json({ message: 'Токен недействителен' });
    }
};
