CREATE TABLE boards
(
    id      VARCHAR(50) UNIQUE NOT NULL,
    title   TEXT NOT NULL,
    user_id INT REFERENCES users (id) ON DELETE CASCADE
);