const jwt = require('jsonwebtoken');
const pool = require('../database/db');
require('dotenv').config();

class TokenService {
    generateTokens (payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken (userId, refreshToken) {
        const tokenData = await pool.query('SELECT * FROM tokens WHERE user_id = $1', [userId]);

        if(tokenData.rows.length > 0) {
            return await pool.query('UPDATE tokens SET refreshtoken = $1 WHERE user_id = $2 RETURNING *', [refreshToken, userId]);
        }

        return await pool.query('INSERT INTO tokens (user_id, refreshtoken) VALUES ($1, $2) RETURNING *', [userId, refreshToken]);
    }


    async removeToken (refreshToken) {
        const tokenData = await pool.query('DELETE FROM tokens WHERE refreshtoken = $1 RETURNING *', [refreshToken]);
        return tokenData.rows[0];
    }


    validateAccessToken (token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    }


    validateRefreshToken (token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    }


    async findToken (refreshToken) {
        const tokenData = await pool.query('SELECT * FROM tokens WHERE refreshtoken = $1', [refreshToken]);
        return tokenData.rows[0];
    }
}

module.exports = new TokenService();