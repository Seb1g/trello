const pool = require('../database/db');
const crypto = require('crypto');
const {BoardDTO} = require("../dtos/boardDto");

class BoardService {
    async createBoard(title, userId) {
        const boardId = crypto.randomUUID();
        const defaultColumns = [
            {title: "Need to do", cards: ["Task 1", "Task 2", "Task 3"]},
            {title: "In progress", cards: ["Task A", "Task B", "Task C"]},
            {title: "Ready", cards: ["Task X", "Task Y", "Task Z"]}
        ];

        const board = await pool.query(
            'INSERT INTO boards (id, title, user_id) VALUES ($1, $2, $3) RETURNING *',
            [boardId, title, userId]
        );

        for (const column of defaultColumns) {
            const columnId = crypto.randomUUID();
            const result = await pool.query(
                'SELECT COALESCE(MAX(position), 0) + 1 AS new_position FROM columns WHERE board_id = $1',
                [boardId]
            );

            const newPosition = result.rows[0].new_position;

            await pool.query(
                'INSERT INTO columns (id, column_title, board_id, position) VALUES ($1, $2, $3, $4)',
                [columnId, column.title, boardId, newPosition]
            );

            for (const cardContent of column.cards) {
                const cardId = crypto.randomUUID();
                const result = await pool.query(
                    'SELECT COALESCE(MAX(position), 0) + 1 AS new_position FROM cards WHERE column_id = $1',
                    [columnId]
                );

                const newPosition = result.rows[0].new_position;
                await pool.query(
                    'INSERT INTO cards (id, content, column_id, position) VALUES ($1, $2, $3, $4)',
                    [cardId, cardContent, columnId, newPosition]
                );
            }
        }

        return new BoardDTO(board.rows[0]);
    };

    async getOneUserBoard(boardId, userId) {
        const boardResult = await pool.query(
            `
                SELECT b.id    AS board_id,
                       b.title AS board_title,
                       json_agg(
                               json_build_object(
                                       'id', c.id,
                                       'title', c.column_title,
                                       'position', c.position,
                                       'cards', (SELECT json_agg(
                                                                json_build_object(
                                                                        'id', cards.id,
                                                                        'content', cards.content,
                                                                        'position', cards.position
                                                                )
                                                        )
                                                 FROM cards
                                                 WHERE cards.column_id = c.id)
                               )
                       )       AS columns
                FROM boards b
                         LEFT JOIN columns c ON b.id = c.board_id
                WHERE b.id = $1
                  AND b.user_id = $2
                GROUP BY b.id, b.title;
            `,
            [boardId, userId]
        );

        if (boardResult.rows.length === 0) return null;

        const board = boardResult.rows[0];

        return {
            id: board.board_id,
            title: board.board_title,
            columns: board.columns || [] // Если колонок нет, вернуть пустой массив
        };
    };

    async getAllUserBoards(userId) {
        const boards = await pool.query(
            'SELECT * FROM boards WHERE user_id = $1',
            [userId]
        );

        return boards.rows.map(board => new BoardDTO(board));
    };

    async deleteBoard(boardId, userId) {
        const result = await pool.query(
            'DELETE FROM boards WHERE id = $1 AND user_id = $2 RETURNING *',
            [boardId, userId]
        );

        return result.rows.length > 0;
    };

    async renameBoard(boardId, userId, newName) {
        const result = await pool.query(
            'UPDATE boards SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
            [newName, boardId, userId]
        );

        if (result.rows.length === 0) return null;
        return new BoardDTO(result.rows[0]);
    };

    async updateBoard(boardId, boardData, userId) {
        // 1. Проверяем, принадлежит ли доска пользователю
        const boardCheck = await pool.query(
            'SELECT * FROM boards WHERE id = $1 AND user_id = $2',
            [boardId, userId]
        );
        if (boardCheck.rows.length === 0) {
            throw new Error('Board not found or access denied');
        }

        // 2. Обновляем позиции колонок и карточек
        for (let i = 0; i < boardData.length; i++) {
            const col = boardData[i];

            await pool.query(
                'UPDATE columns SET position = $1, column_title = $2 WHERE id = $3 AND board_id = $4',
                [i + 1, col.title, col.id, boardId]
            );

            for (let j = 0; j < col.cards.length; j++) {
                const card = col.cards[j];

                await pool.query(
                    'UPDATE cards SET position = $1, column_id = $2 WHERE id = $3',
                    [j + 1, col.id, card.id]
                );
            }
        }
        return {success: true};
    }
}

module.exports = new BoardService();
