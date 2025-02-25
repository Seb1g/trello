const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { boards } = require('./getBoards');

router.post('/create_board', (req, res) => {
    const { title, token } = req.body;
    const newBoard = {
        boardId: crypto.randomUUID(),
        userId: token,
        boardTitle: title,
        columns: [
            {
                title: "Need to do",
                columnId: crypto.randomUUID(),
                cards: [
                    {
                        id: crypto.randomUUID(),
                        content: "1"
                    }, {
                        id: crypto.randomUUID(),
                        content: "12"
                    }, {
                        id: crypto.randomUUID(),
                        content: "123"
                    }
                ]
            }, {
                title: "In progress",
                columnId: crypto.randomUUID(),
                cards: [
                    {
                        id: crypto.randomUUID(),
                        content: "3"
                    }, {
                        id: crypto.randomUUID(),
                        content: "2"
                    }, {
                        id: crypto.randomUUID(),
                        content: "12"
                    }
                ]
            }, {
                title: "Ready",
                columnId: crypto.randomUUID(),
                cards: [
                    {
                        id: crypto.randomUUID(),
                        content: "23"
                    }, {
                        id: crypto.randomUUID(),
                        content: "32"
                    }, {
                        id: crypto.randomUUID(),
                        content: "33"
                    }
                ]
            }
        ]
    };

    boards.push(newBoard);
    res.status(201).json(newBoard);
});

router.post('/create_column', (req, res) => {
    const { boardId, columnTitle } = req.body;
    const board = boards.find(board => board.boardId === boardId);
    if (!board) return res.status(404).json({ message: 'Board not found.' });

    const newColumn = {
        columnId: crypto.randomUUID(),
        title: columnTitle,
        cards: []
    };

    board.columns.push(newColumn);
    res.status(201).json(newColumn);
});

router.post('/create_card', (req, res) => {
    const { boardId, columnId, cardContent } = req.body;
    const board = boards.find(board => board.boardId === boardId);
    if (!board) return res.status(404).json({ message: 'Board not found.' });

    const column = board.columns.find(col => col.columnId === columnId);
    if (!column) return res.status(404).json({ message: 'Column not found.' });

    const newCard = {
        id: crypto.randomUUID(),
        content: cardContent
    };

    column.cards.push(newCard);
    res.status(201).json(newCard);
});

module.exports = router;
