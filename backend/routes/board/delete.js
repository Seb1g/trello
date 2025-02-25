const express = require('express');
const router = express.Router();
const { boards } = require('./getBoards');

router.post('/delete_card', (req, res) => {
    const { boardId, columnId, cardId } = req.body;
    const board = boards.find(board => board.boardId === boardId);
    if (!board) return res.status(404).json({ message: 'Board not found.' });

    const column = board.columns.find(col => col.columnId === columnId);
    if (!column) return res.status(404).json({ message: 'Column not found.' });

    column.cards = column.cards.filter(card => card.id !== cardId);
    res.status(200).json({ message: 'Card deleted successfully.' });
});

router.post('/delete_column', (req, res) => {
    const { boardId, columnId } = req.body;
    const board = boards.find(board => board.boardId === boardId);
    if (!board) return res.status(404).json({ message: 'Board not found.' });

    board.columns = board.columns.filter(col => col.columnId !== columnId);
    res.status(200).json({ message: 'Column deleted successfully.' });
});

router.post('/delete_board', (req, res) => {
    const { boardId } = req.body;
    const index = boards.findIndex(board => board.boardId === boardId);
    if (index === -1) return res.status(404).json({ message: 'Board not found.' });

    boards.splice(index, 1);
    res.status(200).json({ message: 'Board deleted successfully.' });
});

module.exports = router;
