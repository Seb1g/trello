const pool = require('../database/db');
const crypto = require('crypto');
const {BadRequest} = require("../exceptions/apiError");

class ColumnService {
    async createColumn(boardId, columnTitle) {
        const columnId = crypto.randomUUID();

        const result = await pool.query(
            'SELECT COALESCE(MAX(position), 0) + 1 AS new_position FROM columns WHERE board_id = $1',
            [boardId]
        );

        const newPosition = result.rows[0].new_position;

        const column = await pool.query(
            'INSERT INTO columns (id, column_title, board_id, position) VALUES ($1, $2, $3, $4) RETURNING *',
            [columnId, columnTitle, boardId, newPosition]
        );

        return column.rows[0];
    };

    async deleteColumn(boardId, columnId) {
        try {
            const column = await pool.query(
                'SELECT position FROM columns WHERE id = $1 AND board_id = $2',
                [columnId, boardId]
            );

            if (column.rows.length === 0) {
                return new Error('Column not found');
            }

            const deletedPosition = column.rows[0].position;

            await pool.query(
                'DELETE FROM columns WHERE id = $1 AND board_id = $2',
                [columnId, boardId]
            );

            await pool.query(
                'UPDATE columns SET position = position - 1 WHERE board_id = $1 AND position > $2',
                [boardId, deletedPosition]
            );

            return { message: 'Card deleted successfully' };

        } catch (error) {
            throw error;
        }
    };

    async moveColumn(boardId, userId, columnId, newPosition) {
        const board = await pool.query(
            'SELECT * FROM boards WHERE id = $1 AND user_id = $2',
            [boardId, userId]
        );
        if (board.rows.length === 0) {
            throw BadRequest('Board not found or access denied');
        }

        const columns = await pool.query(
            'SELECT id, position FROM columns WHERE board_id = $1 ORDER BY position',
            [boardId]
        );

        if (columns.rows.length === 0) {
            throw BadRequest('No columns found');
        }

        const columnIndex = columns.rows.findIndex(col => col.id === columnId);
        if (columnIndex === -1) {
            throw BadRequest('Column not found');
        }

        const [movedColumn] = columns.rows.splice(columnIndex, 1);

        columns.rows.splice(newPosition - 1, 0, movedColumn);

        for (let i = 0; i < columns.rows.length; i++) {
            await pool.query(
                'UPDATE columns SET position = $1 WHERE id = $2',
                [i + 1, columns.rows[i].id]
            );
        }

        return { message: 'Column moved successfully' };
    }

    async renameColumn(boardId, columnId, newName) {
        const result = await pool.query(
            'UPDATE columns SET column_title = $1 WHERE id = $2 AND board_id = $3 RETURNING *',
            [newName, columnId, boardId]
        );

        if (result.rows.length === 0) return null;
        return result.rows[0];
    }
}

module.exports = new ColumnService();
