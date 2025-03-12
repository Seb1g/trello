const ApiError = require('../exceptions/apiError');
const tokenService = require('../service/tokenService');

module.exports = function authMiddleware(req, res, next) {
    try {
        if (typeof next !== 'function') {
            console.error("next is not a function. Check how the middleware is applied.");
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = userData;
        next();
    } catch (e) {
        console.error("Auth Middleware Error:", e);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};
