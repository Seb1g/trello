const express = require('express');
const router = express.Router();
const { boards } = require('./getBoards');

router.post('/move_card', (req, res) => {
    const { boardId, cardId, fromColumnId, toColumnId } = req.body;
    const board = boards.find(board => board.boardId === boardId);
    if (!board) return res.status(404).json({ message: 'Board not found.' });

    const fromColumn = board.columns.find(col => col.columnId === fromColumnId);
    if (!fromColumn) return res.status(404).json({ message: 'Source column not found.' });

    const toColumn = board.columns.find(col => col.columnId === toColumnId);
    if (!toColumn) return res.status(404).json({ message: 'Destination column not found.' });

    const cardIndex = fromColumn.cards.findIndex(card => card.id === cardId);
    if (cardIndex === -1) return res.status(404).json({ message: 'Card not found.' });

    const [card] = fromColumn.cards.splice(cardIndex, 1);
    toColumn.cards.push(card);
    res.status(200).json({ message: 'Card moved successfully.', card });
});

router.post('/move_column', (req, res) => {
    const { boardId, columnId, newPosition } = req.body;
    const board = boards.find(board => board.boardId === boardId);
    if (!board) return res.status(404).json({ message: 'Board not found.' });

    const columnIndex = board.columns.findIndex(col => col.columnId === columnId);
    if (columnIndex === -1) return res.status(404).json({ message: 'Column not found.' });

    const [column] = board.columns.splice(columnIndex, 1);
    board.columns.splice(newPosition, 0, column);
    res.status(200).json({ message: 'Column moved successfully.', column });
});

module.exports = router;
