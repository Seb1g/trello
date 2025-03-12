CREATE TABLE columns
(
    id           VARCHAR(50) UNIQUE NOT NULL,
    column_title TEXT               NOT NULL,
    position     INT                NOT NULL,
    board_id     VARCHAR(50) REFERENCES boards (id) ON DELETE CASCADE
);