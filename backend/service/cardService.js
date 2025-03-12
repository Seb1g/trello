const pool = require('../database/db');
const crypto = require('crypto');

class ColumnService {
    async createCard(columnId, cardTitle) {
        const cardId = crypto.randomUUID();

        const result = await pool.query(
            'SELECT COALESCE(MAX(position), 0) + 1 AS new_position FROM cards WHERE column_id = $1',
            [columnId]
        );

        const newPosition = result.rows[0].new_position;

        const card = await pool.query(
            'INSERT INTO cards (id, content, column_id, position) VALUES ($1, $2, $3, $4) RETURNING *',
            [cardId, cardTitle, columnId, newPosition]
        );

        return card.rows[0];
    };

    async deleteCard(columnId, cardId) {
        try {
            const card = await pool.query(
                'SELECT position FROM cards WHERE id = $1 AND column_id = $2',
                [cardId, columnId]
            );

            if (card.rows.length === 0) {
                return new Error('Card not found');
            }

            const deletedPosition = card.rows[0].position;

            await pool.query(
                'DELETE FROM cards WHERE id = $1 AND column_id = $2',
                [cardId, columnId]
            );

            await pool.query(
                'UPDATE cards SET position = position - 1 WHERE column_id = $1 AND position > $2',
                [columnId, deletedPosition]
            );

            return {message: 'Card deleted successfully'};

        } catch (error) {
            throw error;
        }
    };

    async moveCardBetweenColumns(oldColumnId, cardId, newColumnId, newPosition) {
        try {
            const card = await pool.query(
                'SELECT * FROM cards WHERE id = $1 AND column_id = $2',
                [cardId, oldColumnId]
            );

            if (card.rows.length === 0) {
                return new Error('Card not found');
            }

            const oldPosition = card.rows[0].position;
            const content = card.rows[0].content;

            await pool.query(
                'DELETE FROM cards WHERE id = $1 AND column_id = $2',
                [cardId, oldColumnId]
            );

            await pool.query(
                'UPDATE cards SET position = position - 1 WHERE column_id = $1 AND position > $2',
                [oldColumnId, oldPosition]
            );

            const result = await pool.query(
                'SELECT COALESCE(MAX(position), 0) + 1 AS new_max_position FROM cards WHERE column_id = $1',
                [newColumnId]
            );

            const maxPosition = result.rows[0].new_max_position;

            const finalPosition = newPosition > maxPosition ? maxPosition : newPosition;

            await pool.query(
                'UPDATE cards SET position = position + 1 WHERE column_id = $1 AND position >= $2',
                [newColumnId, finalPosition]
            );

            const newCard = await pool.query(
                'INSERT INTO cards (id, content, column_id, position) VALUES ($1, $2, $3, $4) RETURNING *',
                [cardId, content, newColumnId, finalPosition]
            );
            return newCard.rows[0];

        } catch (error) {
            throw error;
        }
    };

    async moveCardInColumn(columnId, cardId, newPosition) {
        // Получаем текущие данные карточки
        const card = await pool.query(
            'SELECT * FROM cards WHERE id = $1 AND column_id = $2',
            [cardId, columnId]
        );

        if (card.rows.length === 0) {
            throw new Error('Card not found');
        }

        const oldPosition = card.rows[0].position;
        const content = card.rows[0].content;

        // Удаляем карточку из текущей позиции
        await pool.query(
            'DELETE FROM cards WHERE id = $1 AND column_id = $2',
            [cardId, columnId]
        );

        // Сдвигаем все карточки в колонке, если их позиции больше старой
        await pool.query(
            'UPDATE cards SET position = position - 1 WHERE column_id = $1 AND position > $2',
            [columnId, oldPosition]
        );

        // Получаем максимальную позицию карточек в колонке
        const result = await pool.query(
            'SELECT COALESCE(MAX(position), 0) + 1 AS new_max_position FROM cards WHERE column_id = $1',
            [columnId]
        );

        const maxPosition = result.rows[0].new_max_position;

        // Если новая позиция больше допустимой, ставим в конец
        const finalPosition = newPosition > maxPosition ? maxPosition : newPosition;

        // Сдвигаем карточки вниз перед вставкой, если вставка не в конец
        await pool.query(
            'UPDATE cards SET position = position + 1 WHERE column_id = $1 AND position >= $2',
            [columnId, finalPosition]
        );

        // Вставляем карточку в новую позицию
        const newCard = await pool.query(
            'INSERT INTO cards (id, content, column_id, position) VALUES ($1, $2, $3, $4) RETURNING *',
            [cardId, content, columnId, finalPosition]
        );

        return newCard.rows[0];
    }

    async renameCard(columnId, cardId, newName) {
        const result = await pool.query(
            'UPDATE cards SET content = $1 WHERE id = $2 AND column_id = $3 RETURNING *',
            [newName, cardId, columnId]
        );

        if (result.rows.length === 0) {
            throw new Error('Card not found');
        }

        return result.rows[0];
    };
}

module.exports = new ColumnService();
