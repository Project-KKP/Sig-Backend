const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    
    if (!token) {
        return res.status(403).json({ msg: 'No token provided' });
    }

    // Check if the token starts with 'Bearer '
    if (!token.startsWith('Bearer ')) {
        return res.status(400).json({ msg: 'Token format is invalid' });
    }

    // Remove 'Bearer ' from the token string
    const actualToken = token.split(' ')[1];

    jwt.verify(actualToken, 'secret', (err, decoded) => {
        if (err) {
            return res.status(500).json({ msg: 'Failed to authenticate token' });
        }

        req.userId = decoded.id;
        req.username = decoded.username;
        req.role = decoded.role;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ msg: 'Requires admin role' });
    }
    next();
};

module.exports = {
    verifyToken,
    isAdmin
};
