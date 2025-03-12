CREATE TABLE cards
(
    id        VARCHAR(50) UNIQUE NOT NULL,
    content   TEXT               NOT NULL,
    position  INT                NOT NULL,
    column_id VARCHAR(50) REFERENCES columns (id) ON DELETE CASCADE
);