const router = require('express').Router();

// handlers
const { isValidToken } = require('../../controllers/authHendler');
const { sendUserById, isRegisteredUser } = require('../../controllers/userHendler');
const { checkEmail, doesPasswordExists, isValidated } = require('../../controllers/checkRequest');
const { resendToken } = require('../../controllers/authHendler');

/**
 * @routh   GET apiV1/auth
 * @desc    Get user's details
 * @access  Private
 * */
router.get('/', isValidToken, sendUserById);

/**
 * @routh   POST apiV1/auth
 * @desc    Authenticate & Validate
 * @access  Public
 * */
router.post('/', checkEmail, doesPasswordExists, isValidated, isRegisteredUser, resendToken);

module.exports = router;