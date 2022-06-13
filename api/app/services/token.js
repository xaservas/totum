const jwt = require('jsonwebtoken');
const client = require('../models/client');

const tokenController = {
    generateToken(user) {
        return jwt.sign({ user }, process.env.TOKEN_SECRET, {
            expiresIn: '24h',
        });
    },

    async blacklistToken(token) {
        const query = {
            text: `
                    SELECT *
                    FROM token_blacklist
                    WHERE token = $1
                `,
            values: [token],
        };
        const result = await client.query(query);
        return result.rows[0];
    },

    async verifyToken(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        if (await tokenController.blacklistToken(token)) {
            return res.status(401).json({ message: 'Token blacklisted' });
        }
        return jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = decoded.user;
            return next();
        });
    },
};

module.exports = tokenController;
