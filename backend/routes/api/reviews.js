// backend/routes/api/reviews.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot,Review,ReviewImage,Booking,User,SpotImage,sequelize} = require('../../db/models');
const { check } = require('express-validator');
const {Op} = require('sequelize')
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const reviewValidator = [
    check('review')
        .exists({ checkFalsy:true}).withMessage("err.1 Review text is required"),
    check('stars')
        .exists({ checkFalsy:true}).withMessage("err.1 Stars are required")
        .if((stars,{req}) => stars<1||stars>5).withMessage("err.2 Stars must be an integer from 1 to 5"),
        
    handleValidationErrors
]

const imageValidator = [
    check('url')
    .exists({ checkFalsy:true}).withMessage("err.1 Review text is required"),
    handleValidationErrors
]

// Get all reviews of the current user
// REQUIRES Authentication
// Complete not tested
router.get('/current', requireAuth, async (req,res) => {
    const reviews = await Review.findAll({where:{userId:req.user.id},
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
    //res.json({reviews})
    let reviewz = []
    reviews.forEach(review => {
        reviewz.push(review.toJSON())
    })
    for(let review of reviewz){
        let previewImages = await SpotImage.findOne({where:{[Op.and]:[{spotId:review.Spot.id},{preview:true}]}})
        if(previewImages){
            review.Spot.previewImage = previewImages.url
        }else{
            review.Spot.previewImage = "No preview images :("
        }
        
    }
    res.statusCode = 200
    res.json({Reviews:reviewz})
    // const spotImages = await SpotImage.findByPk(reviews.spotId, {attributes:['url']})
    // const useableReview = reviews.toJSON()
    // useableReview.previewImage = spotImages.url
    // res.json({Reviews:[useableReview]})
    
})

// Edit a review
// Requires Authentication
// Review must belong to user
// Complete
router.put('/:reviewId', requireAuth, reviewValidator, async(req,res) => {
    const updatedReview = await Review.findByPk(req.params.reviewId)
    const {review,stars} = req.body 
    if(updatedReview){
        if(updatedReview.userId == req.user.id){
            await updatedReview.update({review,stars})
            res.json(updatedReview)
        }else{
            res.statusCode = 404
            res.json({"message":"You do not own this review","StatusCode":res.statusCode})
        }
    }else{
        res.statusCode = 404
        res.json({"message":"Review couldn't be found","StatusCode":res.statusCode})
    }
    
})

// Add an image to a review with a review id
// Requires authorization
// Must belong to user
// In Progress
router.post('/:reviewId/images', requireAuth, async(req,res) => {
    const reviewImages = await ReviewImage.findAll({where:{reviewId:req.params.reviewId}})
    const review = await Review.findByPk(req.params.reviewId)
    const {url} = req.body
    if(review){
        if(review.userId == req.user.id){ //if review is owned by user
            if(reviewImages.length <= 10){ //if review length is less than or equal to 10
                const newReviewImage = await ReviewImage.create({reviewId:req.params.reviewId,url})
                res.statusCode = 200
                res.json(newReviewImage)
            }else{//review images greater than 10
                res.statusCode = 403
                res.json({"message":"Maximum number of images for this resource was reached (10)","StatusCode":res.statusCode})
            }
        }else{
            res.statusCode = 404
            res.json({"message":"You do not own this review","StatusCode":res.statusCode})
        }
    }else{
        res.statusCode = 404
        res.json({"message":"Review couldn't be found","StatusCode":res.statusCode})
    }
    
    //reviews.length
})

// Delete a review
// Require authentication
// User must be owner of review to delete
// Complete
router.delete('/:reviewId', requireAuth, async(req,res) => {
    const review = await Review.findByPk(req.params.reviewId)
    if(review){
        if(review.userId == req.user.id){
            await review.destroy()
            res.statusCode = 200
            res.json({"message":"Successfully deleted","statusCode":res.statusCode})
        }else{
            res.statusCode = 404
            res.json({"message":"You do not own this review","statusCode":res.statusCode})
        }
    }else{
        res.statusCode = 404
        res.json({"message":"Review couldn't be found","statusCode":res.statusCode})
    }
})

module.exports = router;