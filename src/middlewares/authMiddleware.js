const jwt = require('jsonwebtoken');
//const SECRET_KEY = 'your_secret_key';

function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        //console.log(err)
        res.status(403).json({ error: 'Invalid token' });
    }
}

module.exports = authMiddleware;
