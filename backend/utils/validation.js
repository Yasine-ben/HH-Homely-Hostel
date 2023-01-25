// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('Bad request.');
    err.errors = errors;
    err.status = 400;
    err.title = 'Bad request.';
    // next(err); //generic response to satisfy endpoint for login errors
    res.statusCode = 400
    res.json({
      "message":"Validation error",
      "statusCode":400,
      "errors":{
        "credential":"Email or username is requried",
        "password":"Password is required"
      }
    })
  }
  next();
};

module.exports = {
  handleValidationErrors
};