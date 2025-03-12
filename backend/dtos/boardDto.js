class BoardDTO {
    constructor(board) {
        this.id = board.id;
        this.title = board.title;
        this.userId = board.user_id;
    }
}

class ColumnDTO {
    constructor(column) {
        this.id = column.id;
        this.title = column.title;
        this.boardId = column.board_id;
    }
}

class CardDTO {
    constructor(card) {
        this.id = card.id;
        this.content = card.content;
        this.columnId = card.column_id;
    }
}

module.exports = { BoardDTO, ColumnDTO, CardDTO };
