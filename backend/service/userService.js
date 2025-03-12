const pool = require('../database/db');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
// const MailService = require('./mailService');
const TokenService = require('./tokenService');
const UserDto = require('../dtos/userDto');
require('dotenv').config();
const ApiError = require('../exceptions/apiError');

class UserService {
    async registration(email, password) {
        const candidate = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if (candidate.rows.length > 0) {
            throw ApiError.BadRequest(`Пользователь уже с таким Email ${email} существует`)
        }

        const cryptSalt = 4;
        const hashPassword = await bcrypt.hash(password, cryptSalt);
        const activationLink = uuid.v4();

        const user = await pool.query(
            'INSERT INTO users (email, password, activationlink, isactivated) VALUES ($1, $2, $3, $4) RETURNING *',
            [email, hashPassword, activationLink, false]
        );
        // await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user.rows[0]);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }


    async activate(activationLink) {
        const user = await pool.query(
            'SELECT * FROM users WHERE activationlink = $1',
            [activationLink]
        );
        if (!user) {
            throw ApiError.BadRequest('Некорректная ссылка');
        }

        return await pool.query(
            'UPDATE users SET isactivated = $1 WHERE activationlink = $2 RETURNING *',
            [true, user]
        );
    }


    async login(email, password) {
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            throw ApiError.BadRequest('User undefined');
        }
        const isPassEquals = await bcrypt.compare(password, user.rows[0].password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Invalid password');
        }
        const userDto = new UserDto(user.rows[0]);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }


    async logout(refreshToken) {
        return await TokenService.removeToken(refreshToken);
    }


    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const userQuery = await pool.query('SELECT * FROM users WHERE id = $1', [userData.id]);
        const user = userQuery.rows[0]
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService();