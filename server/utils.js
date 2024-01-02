const handleErrorResponse = (res, error, message, statusCode = 500) => {
    console.error(`Error: ${message}`, error);
    return res.status(statusCode).json({ success: false, message: `Error ${message}.` });
};

module.exports = handleErrorResponse