const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const boards = []; // In-memory хранилище досок

// Создание новой доски
router.post('/', authMiddleware, (req, res) => {
    const { title, description } = req.body;
    const newBoard = {
        id: Date.now(), // Используй UUID или базу данных для уникальных идентификаторов
        userId: req.user.id, // Используем ID из токена
        title,
        description
    };
    boards.push(newBoard);
    res.status(201).json(newBoard);
});

// Получение всех досок текущего пользователя
router.get('/', authMiddleware, (req, res) => {
    const userBoards = boards.filter(board => board.userId === req.user.id);
    res.json(userBoards);
});

// Получение конкретной доски по ID
router.get('/:id', authMiddleware, (req, res) => {
    const board = boards.find(
        board => board.id === req.params.id && board.userId === req.user.id
    );
    if (!board) {
        return res.status(404).json({ message: 'Доска не найдена' });
    }
    res.json(board);
});

// Обновление доски
router.put('/:id', authMiddleware, (req, res) => {
    const boardIndex = boards.findIndex(
        board => board.id === req.params.id && board.userId === req.user.id
    );
    if (boardIndex === -1) {
        return res.status(404).json({ message: 'Доска не найдена' });
    }
    const updatedBoard = { ...boards[boardIndex], ...req.body };
    boards[boardIndex] = updatedBoard;
    res.json(updatedBoard);
});

// Удаление доски
router.delete('/:id', authMiddleware, (req, res) => {
    const boardIndex = boards.findIndex(
        board => board.id === req.params.id && board.userId === req.user.id
    );
    if (boardIndex === -1) {
        return res.status(404).json({ message: 'Доска не найдена' });
    }
    boards.splice(boardIndex, 1);
    res.json({ message: 'Доска удалена' });
});

module.exports = router;
