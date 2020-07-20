const router = require('express').Router();
const User = require('../../models/User');

// handlers
const { checkName, checkEmail, checkPassword, doesPasswordExists, isValidated } = require('../../controllers/checkRequest');
const { isRegisteredUser, registeredUser, logUser } = require('../../controllers/userHendler');

/**
 * @routh   POST apiV1/users/register
 * @desc    Register new user
 * @access  Public
 * */
router.post('/register', checkName, checkEmail, checkPassword, isValidated, isRegisteredUser, registeredUser);

/**
 * @routh   POST apiV1/users/login
 * @desc    Log an existing user
 * @access  Public
 * */
router.get('/register', doesPasswordExists, isValidated, isRegisteredUser, logUser);

module.exports = router;