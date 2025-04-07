const columnService = require("../service/columnService");

class ColumnController {
    async createColumn(req, res, next) {
        try {
            const {boardId, columnTitle} = req.body;
            const columnData = await columnService.createColumn(boardId, columnTitle);
            return res.json(columnData);
        } catch (e) {
            next(e);
        }
    }

    async deleteColumn(req, res, next) {
        try {
            const {boardId, columnId} = req.body;
            const success = await columnService.deleteColumn(boardId, columnId);
            return res.json(success);
        } catch (e) {
            next(e);
        }
    }

    async renameColumn(req, res, next) {
        try {
            const {boardId, columnId, newName} = req.body;
            const column = await columnService.renameColumn(boardId, columnId, newName);
            if (!column) return res.status(404).json({ message: 'Board not found' });
            return res.json(column);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ColumnController();