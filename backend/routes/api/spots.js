// backend/routes/api/spots.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');
const sequelize = require('sequelize')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpot = [  //validator for the creation of spots
    check('address')//validator for address
        .exists({ checkFalsy: true}).withMessage("Address is required")
        .isLength({min:1,max:50}).withMessage("Address must be between 1 and 50 chars"),
    check('city')//validator for city
        .exists({ checkFalsy: true}).withMessage("City is required")
        .isLength({min:3,max:50}).withMessage("City must be between 3 and 50 chars"),
    check('state')//validator for state
        .exists({ checkFalsy: true}).withMessage("State is required")
        .isLength({min:4,max:50}).withMessage("State must be between 4 and 50 chars"),
    check('country')//validator for country
        .exists({ checkFalsy: true}).withMessage("Country is required")
        .isLength({min:4,max:56}).withMessage("Country must be between 4 and 56 chars"),
    check('lat')//validator for real lat
        .exists({ checkFalsy: true}).withMessage('Latitude is required')
        .isLength({min:-90,max:90}) .withMessage("Latitude is not valid lat must be between -90 and 90"),
    check('lng')//validator for real lng
        .exists({ checkFalsy: true}).withMessage('Longitude is required')
        .isLength({min:-180,max:180}).withMessage("Longitude is not valid lng must be between -180 and 180"),
    check('name')//validator for name
        .exists({ checkFalsy: true}).withMessage("Name is required")
        .isLength({min:1,max:50}).withMessage("Name must be less than 50 characters"),
    check('description')//validator for description
        .exists({ checkFalsy: true}).withMessage("Description is required")
        .isLength({min:1,max:50}).withMessage('Description length is not valid (must be 1-50 chars'),
    check('price')//validator for price
        .exists({ checkFalsy: true}).withMessage("Price per day is required")
        .isLength({min:1,max:50}).withMessage('Price per day is not valid (must be 1-50 nums in length)'),
    handleValidationErrors
];

// Get all Spots
// Doesnt require authentication
// WORKING!! 
router.get('/', async (req,res) => { 
    const spots = await Spot.findAll({})
    res.json(spots)
})

// Create a spot
router.post('/', requireAuth, validateSpot, async (req,res) => {
    const {address,city,state,country,lat,lng,name,description,price} = req.body

    const createdSpot = await Spot.create({ownerId:req.user.id,address,city,state,country,lat,lng,name,description,price})
    
    res.statusCode = 201
    res.json(createdSpot)
})

// Get all Spots owned by the Current User
router.get('/current',(req,res) => {

})

// Get details of a Spot from an id
router.get('/:spotId',(req,res) => {

})

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', (req,res) => {

})

// Edit a Spot
router.put('/:spotId',(req,res) => {

})

// Delete a Spot
router.delete('/:spotId', (req,res) => {

})




module.exports = router;