const { models } = require('mongoose');
const { JWT_SECRAT } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { serverError } = require('../lib/server');

exports.isValidToken = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'Missing token, authorization denied' });
    try {
        const decodedToken = jwt.verify(token, JWT_SECRAT);
        req.user = decodedToken.user;
        return next();
    } catch (error) {
        serverError(null, res, 'Invalid token', 401);
    }
}

exports.resendToken = async (req, res) => {
    if (!req.user) return res.status(400).json({ error: [{ msg: 'Invalid credentials' }] });

    const { password } = req.body;
    const { user } = req;
    const options = { expiresIn: '1h' };

    try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: [{ msg: 'Invalid credentials' }] });

        const payload = { user: { id: user.id, name: user.name } };
        jwt.sign(payload, JWT_SECRAT, options, (error, token) => {
            return error ? serverError(error, res) : res.json({ token });
        });
    } catch (error) {
        serverError(error, res);
    }
}
