const cardService = require("../service/cardService");

class CardController {
    async createCard(req, res, next) {
        try {
            const {columnId, cardTitle} = req.body;
            const cardData = await cardService.createCard(columnId, cardTitle);
            return res.json(cardData);
        } catch (e) {
            next(e);
        }
    }

    async deleteCard(req, res, next) {
        try {
            const {columnId, cardId} = req.body;
            const success = await cardService.deleteCard(columnId, cardId);
            return res.json(success);
        } catch (e) {
            next(e);
        }
    }

    async moveCardBetweenColumns(req, res, next) {
        try {
            const {oldColumnId, cardId, newColumnId, newPosition} = req.body;
            const success = await cardService.moveCardBetweenColumns(oldColumnId, cardId, newColumnId, newPosition);
            return res.json(success);
        } catch (e) {
            next(e);
        }
    }
    async moveCardInColumn (req, res, next) {
        try {
            const {columnId, cardId, newPosition} = req.body;
            const success = await cardService.moveCardInColumn(columnId, cardId, newPosition);
            return res.json(success);
        } catch (e) {
            next(e);
        }
    }
    async renameCard(req, res, next) {
        try {
            const {columnId, cardId, newName} = req.body;
            const success = await cardService.renameCard(columnId, cardId, newName);
            if (!success) return res.status(404).json({message: 'Board not found'});
            return res.json({message: 'Card success renamed'});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new CardController();