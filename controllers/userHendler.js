const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRAT } = process.env;
const { serverError } = require('../lib/server');

exports.isRegisteredUser = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        req.user = user;
        return next();
    } catch (error) {
        serverError(error, res);
    }
}

exports.registeredUser = async (req, res) => {
    if (req.user) return res.status(400).json({ error: [{ msg: 'User already exists' }] });

    const { name, email, password } = req.body;
    const options = { expiresIn: '1h' };
    try {
        const salt = await bcrypt.genSalt();
        const user = await new User({ name, email, password });
        user.password = await bcrypt.hash(password, salt);
        user.save();
        const payload = { user: { id: user.id, name: user.name } };
        jwt.sign(payload, JWT_SECRAT, options, (error, token) => {
            return error ? serverError(error, res) : res.json({ token });
        });
    } catch (error) {
        serverError(error, res);
    }
}

exports.sendUserById = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (error) {
        serverError(error, res);
    }
}

exports.logUser = async (req, res) => {
    if (!req.user) return res.status(403).json({ error: [{ msg: 'Password incorrect' }] });

    const { password } = req.body;
    const { user } = req;
    const options = { expiresIn: '1h' };

    try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(403).json({ error: [{ msg: 'Password incorrect' }] });

        const payload = { user: { id: user.id, name: user.name } };
        jwt.sign(payload, JWT_SECRAT, options, (error, token) => {
            return error ? serverError(error, res) : res.json({ token });
        });
    } catch (error) {
        serverError(error, res);
    }
}
