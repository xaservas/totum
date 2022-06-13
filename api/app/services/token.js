const jwt = require('jsonwebtoken');

module.exports = {
    generateToken(user) {
        return jwt.sign({ user }, process.env.TOKEN_SECRET, {
            expiresIn: '1h',
        });
    },

    verifyToken(req, res, next) {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
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
