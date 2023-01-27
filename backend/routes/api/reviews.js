// backend/routes/api/spots.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot,Review,ReviewImage,Booking,User,SpotImage,sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const reviewValidator = [
    check(),
    check(),
    handleValidationErrors
]
// Get all reviews of the current user
// REQUIRES AUTH
// TESTED WORKING 
router.get('/current', requireAuth, async (req,res) => {
    const reviews = await Review.findByPk(req.user.id,{
        include:[
        {
            model:User,
            attributes:['id','firstName','lastName']
        },
        {
            model:Spot,
            attributes:['id','ownerId','address','city','state','country','lat','lng','name','price'],
        },
        {
            model:ReviewImage,
            attributes:['id','url']
        }
        ]
    })
    const spotImages = await SpotImage.findByPk(reviews.spotId, {attributes:['url']})
    const useableReview = reviews.toJSON()
    useableReview.previewImage = spotImages.url
    res.json({Reviews:[useableReview]})
    
})



module.exports = router;