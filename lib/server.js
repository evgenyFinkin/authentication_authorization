exports.serverError = (error, res, msg = 'Server error', code = 500) => {
    if (error) console.error(error);
    return res.status(code).send(msg);
};