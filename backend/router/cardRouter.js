const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const CardController = require("../controllers/cardController");
const router = express.Router();

router.post('/create_card', authMiddleware, CardController.createCard);
router.delete('/delete_card', authMiddleware, CardController.deleteCard);
router.post('/move_card_between_columns', authMiddleware, CardController.moveCardBetweenColumns);
router.post('/move_card_in_column', authMiddleware, CardController.moveCardInColumn);
router.put('/rename_card', authMiddleware, CardController.renameCard);

module.exports = router;