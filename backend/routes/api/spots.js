// backend/routes/api/spots.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot,Review,ReviewImage,Booking,User,SpotImage,sequelize} = require('../../db/models');
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
// WORKING but needs avg rating functionality and images
router.get('/', async (req,res) => { 
    const allSpots = await Spot.findAll({include:[{
        model: Review
    },
    {
        model:SpotImage
    }    
    ]}
    )

    let spots = []
    for(let i = 0;i<allSpots.length;i++){spots.push(allSpots[i].toJSON())}

    function AverageReviewCalc(){
        for(let a = 0; a<spots.length;a++){
            let len = 0
            let total = 0
        if(spots[a].Reviews){
            for(let i = 0; i<spots[a].Reviews.length; i++){
                total += spots[a].Reviews[i].stars
                len++
            }

            if(len === 0){
                spots[a].avgRating = 'No Reviews have been submitted for this spot :|'
            }else{
                spots[a].avgRating = (total/len).toFixed(1)
            }
            delete spots[a].Reviews
        }     
        }
    }
    function SpotImageCheck(){
        spots.forEach(spot => {
            spot.SpotImages.forEach(spotImage => {
                if(spotImage.preview === true){
                    spot.previewImage = spotImage.url
                }else{
                    spot.previewImage = "There are no Images for this spot :|"
                }
                delete spot.SpotImages
            })
        })
    }

    AverageReviewCalc()
    SpotImageCheck()

    res.json({"spots":spots})
})

// Create a spot
// Requires Authentication
// Working!!!
router.post('/', requireAuth, validateSpot, async (req,res) => {
    const {address,city,state,country,lat,lng,name,description,price} = req.body

    const createdSpot = await Spot.create({ownerId:req.user.id,address,city,state,country,lat,lng,name,description,price})
    
    res.statusCode = 201
    res.json(createdSpot)
})

// Get all Spots owned by the Current User
// Requires Authentication
// tested
router.get('/current', requireAuth, async(req,res) => {
    console.log("USER ID",req.user.id)
    const currentUserSpots = await Spot.findAll({
        where:{ownerId:req.user.id},
        include:[{
            model: Review
        },
        {
            model:SpotImage
        }    
        ]
    })

    let spots = []
    for(let i = 0;i<currentUserSpots.length;i++){spots.push(currentUserSpots[i].toJSON())}

    function AverageReviewCalc(){
        for(let a = 0; a<currentUserSpots.length;a++){
            let len = 0
            let total = 0
        
            for(let i = 0; i<spots[a].Reviews.length; i++){
                total += spots[a].Reviews[i].stars
                len++
            }

            if(len === 0){
                spots[a].avgRating = 'No Reviews have been submitted for this spot :|'
            }else{
                spots[a].avgRating = (total/len).toFixed(1)
            }
            delete spots[a].Reviews
      }     
    }
    function SpotImageCheck(){
        // for(let a = 0; a<spots.length;a++){
        //     for(let i = 0; i<spots[a].SpotImages.length; i++){
        //         if(spots[a].SpotImages[i].Preview === true){
        //             spots[a].previewImage = spots[a].SpotImage[i].url
        //         }else{
        //             spots[a].previewImage = "There are no Images for this Spot :|"
        //         }
        //         console.log("aijf;'aopijfsaop'ijfaop'isjf'aposfj'apsojfa'psof'aopsj")
        //         delete spots[a].SpotImages
        //     }
        // }
        spots.forEach(spot => {
            spot.SpotImages.forEach(spotImage => {
                if(spotImage.preview === true){
                    spot.previewImage = spotImage.url
                }else{
                    spot.previewImage = "There are no Images for this spot :|"
                }
                delete spot.SpotImages
            })
        })
    }

    AverageReviewCalc()
    SpotImageCheck()
    
    res.statusCode = 200
    res.json({'Spots':spots})
})

// Get details of a Spot from an id
// Does not require authentication
// In Progress
router.get('/:spotId',async(req,res) => {
    const spot = await Spot.findByPk(req.params.spotId,{
        include:[{
            model:Review
        },
        {
            model:SpotImage,
            attributes:['id','url','preview']
        },
        {
            model:User,
            attributes:['id','firstName','lastName']
        }
        ]}
    )
    
    if(spot){
        let useableSpot = spot.toJSON()
        let len = 0
        let total = 0 

        useableSpot.Reviews.forEach(review => {
            len++
            total += review.stars
        })
        if(!(len === 0)) {
            useableSpot.numReviews = len
            useableSpot.avgStarRating = (total/len).toFixed(1)
        }else{
            useableSpot.numReviews = len
            useableSpot.avgStarRating = "not enough reviews have been submitted"
        }
        delete useableSpot.Reviews
        
        useableSpot.Owner = useableSpot.User
        delete useableSpot.User

        //maybe format the res better :((

        res.statusCode = 200
        res.json(useableSpot)
    }else{
        res.statusCode = 404
    res.send({"message":"Spot couldn't be found","statusCode":res.statusCode})
    }
})

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', async(req,res) => {

})

// Edit a Spot
router.put('/:spotId',async (req,res) => {

})

// Delete a Spot
// Require authentication
// Spot must belong to current user
// TESTED WORKS!!
router.delete('/:spotId',requireAuth, async (req,res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    
    if(spot){
        console.log(spot.dataValues.ownerId == req.user.id)
        if(spot.ownerId == req.user.id){
            await spot.destroy();
            res.statusCode = 200
            res.json({"message":"Successfully deleted","statusCode":res.statusCode})
        }else{
            res.statusCode = 404
            res.json({"message":"You do not own this spot","StatusCode":res.statusCode})
        }
    }
    else{
        res.statusCode = 404
        res.json({"message":"Spot couldn't be found","StatusCode":res.statusCode})
    }
})




module.exports = router;