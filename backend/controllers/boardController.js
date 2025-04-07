const boardService = require("../service/boardService");

class BoardController {
    async createBoard(req, res, next) {
        try {
            const {title, userId} = req.body;
            const boardData = await boardService.createBoard(title, userId);
            return res.json(boardData);
        } catch (e) {
            next(e);
        }
    }

    async getOneUserBoard(req, res, next) {
        try {
            const {boardId, userId} = req.query;
            const oneUserBoard = await boardService.getOneUserBoard(boardId, userId);
            return res.json(oneUserBoard);
        } catch (e) {
            next(e);
        }
    }

    async getAllUserBoards(req, res, next) {
        try {
            const userId = req.query.userId;
            const allUserBoards = await boardService.getAllUserBoards(userId);
            return res.json(allUserBoards);
        } catch (e) {
            next(e);
        }
    }

    async deleteBoard(req, res, next) {
        try {
            const {boardId, userId} = req.body;
            const success = await boardService.deleteBoard(boardId, userId);
            if (!success) return res.status(404).json({message: 'Board not found'});
            return res.json({message: 'Board deleted successfully'});
        } catch (e) {
            next(e);
        }
    }

    async renameBoard(req, res, next) {
        try {
            const {boardId, userId, newName} = req.body;
            const board = await boardService.renameBoard(boardId, userId, newName);
            if (!board) return res.status(404).json({message: 'Board not found'});
            return res.json(board);
        } catch (e) {
            next(e);
        }
    }

    async updateBoard(req, res, next) {
        try {
            const {boardId, boardData, userId} = req.body;
            const board = await boardService.updateBoard(boardId, boardData, userId);
            if (!board) return res.status(404).json({message: 'Board not found'});
            return res.json({message: 'Board updated successfully', board});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new BoardController();