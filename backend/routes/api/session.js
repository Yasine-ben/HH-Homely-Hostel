// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Email or username is required.'),
    
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password is required'),
    handleValidationErrors
];

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;
  
      const user = await User.login({ credential, password });
  
      if (!user) {
        //const err = new Error('Login failed');
        res.statusCode = 401;
        return res.json({
          "message":"Invalid credentials",
          "statusCode": "401"
        });
      }
  
      await setTokenCookie(res, user);
  
      return res.json({
        user: user
      });
    }
);
  
// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
);
  
// Restore session user
router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user
        });
      } else {
        res.statusCode = 204
        res.json({"user":null})
        // res.statusCode = 401
        // res.json({
        //   "message": "Authentication required",
        //   "statusCode": res.statusCode
        // })
      };
    }
);



module.exports = router;