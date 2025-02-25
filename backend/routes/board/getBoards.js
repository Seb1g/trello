const express = require('express');
const router = express.Router();

const boards = [];

router.post('/get_all_user_boards', (req, res) => {
    const { token } = req.body;
    const userBoards = boards.filter(board => board.userId === token);
    res.json(userBoards);
});

router.post('/get_board', (req, res) => {
    const { boardId, id } = req.body;
    const board = boards.find(board => board.boardId === boardId && board.userId === id);
    if (!board) {
        return res.status(404).json({ message: 'Доска не найдена' });
    }
    res.json(board);
});

module.exports = { router, boards };
