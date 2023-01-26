// backend/utils/validation.js
const {body, validationResult } = require('express-validator');
console.log(validationResult)
// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors
      .array()
      .map((error) => `${error.msg}`);

    const err = Error('');
    err.errors = errors;

    //unique email/username validation response //log in\\
    if((err.errors[0].toString().includes("User with that email already exists"))||(err.errors[0].toString().includes("User with that username already exists"))){
      err.message = "User already exists"
      err.statusCode = 403
      res.statusCode = 403
      return res.json({"message":err.message,"statusCode":err.statusCode,"errors":err.errors})
    }




    //basic validation error res
     err.message = "Validation Error"
     err.status = 400;
     res.statusCode = 400
    return res.json({"message":err.message,"statusCode":err.status,"errors":err.errors})
  }
  next();
};

module.exports = {
  handleValidationErrors
};