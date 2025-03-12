CREATE TABLE tokens
(
    id           SERIAL PRIMARY KEY,
    user_id      INT REFERENCES users (id) ON DELETE CASCADE,
    refreshToken VARCHAR(255)
);