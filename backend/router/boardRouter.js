const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const BoardController = require("../controllers/boardController");
const router = express.Router();

router.post('/create_board', authMiddleware, BoardController.createBoard);
router.get('/get_one_user_board', authMiddleware, BoardController.getOneUserBoard);
router.get('/get_all_user_boards', authMiddleware, BoardController.getAllUserBoards);
router.delete('/delete_board', authMiddleware, BoardController.deleteBoard);
router.put('/rename_board', authMiddleware, BoardController.renameBoard);
router.post('/update_board', authMiddleware, BoardController.updateBoard);

module.exports = router;