// backend/routes/api/users.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check ('firstName')
      .exists({ checkFalsy: true})
      .withMessage('please provide a first name'),
    
      check('lastName')
      .exists({ checkFalsy: true})
      .withMessage('please provide a last name'),
    
    check('email')
      .custom(value => {
        return User.findOne({where: {email: value}}).then(User => {
          if(User){
            return Promise.reject('User with that email already exists')
          }
        })
      })
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    
    check('username')
      .custom(value => {
        return User.findOne({where:{username:value}}).then(user => {
          if(user){
            return Promise.reject("User with that username already exists")
          }
        })
      })
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const {firstName,lastName,email,username,password} = req.body;
      const user = await User.signup({firstName,lastName,email,username,password});
      
      await setTokenCookie(res, user);

      //adds token info to res user value
      let userRes = user
      userRes.dataValues.token = req.cookies.token.toString()
      console.log(userRes)

      return res.json(userRes);
    }
  );

  // app.use((err, req, res, next) => {
  //   console.error(err.stack)
  //   res.status(401).send(err)
  // })

module.exports = router;