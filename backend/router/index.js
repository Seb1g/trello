const UserController = require('../controllers/userController.js');
const BoardController = require('../controllers/boardController.js');
const ColumnController = require('../controllers/columnController.js');
const CardController = require('../controllers/cardController.js');
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');

// router.get('/activate/:link', UserController.activate);

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refresh);

router.post('/create_board', authMiddleware, BoardController.createBoard);
router.get('/get_one_user_board', authMiddleware, BoardController.getOneUserBoard);
router.get('/get_all_user_boards', authMiddleware, BoardController.getAllUserBoards);
router.delete('/delete_board', authMiddleware, BoardController.deleteBoard);
router.put('/rename_board', authMiddleware, BoardController.renameBoard);

router.post('/create_column', authMiddleware, ColumnController.createColumn);
router.delete('/delete_column', authMiddleware, ColumnController.deleteColumn);
router.post('/move_column', authMiddleware, ColumnController.moveColumn)
router.put('/rename_column', authMiddleware, ColumnController.renameColumn);

router.post('/create_card', authMiddleware, CardController.createCard);
router.delete('/delete_card', authMiddleware, CardController.deleteCard);
router.post('/move_card_between_columns', authMiddleware, CardController.moveCardBetweenColumns);
router.post('/move_card_in_column', authMiddleware, CardController.moveCardInColumn);
router.put('/rename_card', authMiddleware, CardController.renameCard);

module.exports = router;
