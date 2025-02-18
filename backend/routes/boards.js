const express = require('express');
const router = express.Router();
const boards = [];

router.post('/create_board', (req, res) => {
    console.log(req.body);
    console.log(req.headers);
    const { title, token } = req.body;
    const newBoard = {
        id: Date.now(),
        userId: token,
        title: title,
        columns: {
            "Need to do": {
                "card": {}
            },
            "In progress": {
                "card": {}
            },
            "Ready": {
                "card": {}
            }
        }
    };
    boards.push(newBoard);
    console.log(newBoard);
    res.status(201).json(newBoard);
});
router.get('/get_all_user-board', (req, res) => {
    const userBoards = boards.filter(board => board.userId === req.body.token);
    res.json(userBoards);
});










router.get('/get_board/:id',
    (req, res) => {
    const board = boards.find(
        board => board.id === req.params.id && board.userId === req.user.id
    );
    if (!board) {
        return res.status(404).json({ message: 'Доска не найдена' });
    }
    res.json(board);
});

router.put('/update_board/:id',
    (req, res) => {
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

router.delete('/delete_board/:id',
    (req, res) => {
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
