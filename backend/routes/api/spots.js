// backend/routes/api/spots.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot,Review,ReviewImage,Booking,User,SpotImage,sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();
router.use(express.json());


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

const validateSpotImage =[
    check('url')
        .exists({ checkFalsy:true}).withMessage("image url required"),
    check('preview')
        .exists({ checkFalsy:true}).withMessage("preview must exist"),
    handleValidationErrors
]

const reviewValidator = [
    check('review')
        .exists({ checkFalsy:true}).withMessage("Review text is required"),
    check('stars').exists({ checkFalsy:true}).custom(value => {
        if(!(value<=5 || value >=1)) {
        return Promise.reject('Stars must be an integer from 1 to 5')
        }
    }),
    handleValidationErrors
]

// const bookingValidator = [
//     check('startDate').exists({ checkFalsy:true}).custom(date => {
//         const newDate = new Date(date)
//         if(isNaN(newDate)) {
//         return Promise.reject('Must be a valid start date')
//         }
//     }),
//     check('endDate').exists({ checkFalsy:true}).custom(date => {
//         const newDate = new Date(date)
//         if(isNaN(newDate)) {
//         return Promise.reject('Must be a valid end date')
//         }
//     }),
//     handleValidationErrors
// ]

// Get all Spots
// Doesnt require authentication
// TESTED WORKS
// add rest of pagination functionality
router.get('/', async (req,res) => { 
    const {minLat,maxLat,minLng,maxLng,minPrice,maxPrice} = req.query
    let page = req.query.page === undefined ? 1 :parseInt(req.query.page)
    let size = req.query.size === undefined ? 20 : parseInt(req.query.size)
    
    if(page<1 || page>10 || isNaN(page)){
        res.statusCode = 400
        res.json({
            message: "Validation Error",
            statusCode: res.statusCode,
            errors: { page: "Page must be greater than or equal to 1" }
        })
    }
    if(size <1 || size>20 || isNaN(size)){
        res.statusCode = 400
        res.json({
            message: "Validation Error",
            statusCode: res.statusCode,
            errors: { page: "Size must be greater than or equal to 1" }
        })
    }
    if(page >=1 && size >= 1){
        limit = size
        offset = size * (page-1)
    }

    if(minLat && isNaN(minLat)){
        res.statusCode = 400
        res.json({
            message: "Validation Error",
            statusCode: statusCode,
            errors: { minLat:"Minimum latitude is invalid" }
        })
    }
    if(maxLat && isNaN(maxLat)){
        res.statusCode = 400
        res.json({
            message:"Validation Error",
            statusCode: res.statusCode,
            errors:{minLat:"Maximum latitude is invalid"}
        })
    }
    if(minLng && isNaN(minLng)){
        res.statusCode = 400
        res.json({
            message:"Validation Error",
            statusCode: res.statusCode,
            errors:{minLat:"Minimum longitude is invalid"}
        })
    }
    if(maxLng && isNaN(maxLng)){
        res.statusCode = 400
        res.json({
            message:"Validation Error",
            statusCode: res.statusCode,
            errors:{minLat:"Maximum longitude is invalid"}
        })
    }
    if(minPrice && (isNaN(minPrice) || minPrice < 0)){
        res.statusCode = 400
        res.json({
            message:"Validation Error",
            statusCode: res.statusCode,
            errors:{minLat:"Minimum price must be greater than or equal to 0"}
        })
    }
    if(maxPrice && (isNaN(maxPrice) || maxPrice < 0 )){
        res.statusCode = 400
        res.json({
            message:"Validation Error",
            statusCode: res.statusCode,
            errors:{minLat:"Maximum price must be greater than or equal to 0"}
        })
    }

    const allSpots = await Spot.findAll({
    include:[
    {
        model: Review
    },
    {
        model:SpotImage
    }    
    ],
    limit:limit,
    offset:offset
    })
    
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
    
    res.json({"Spots":spots,"page":page,"size":size})
})

// Create a spot
// Requires Authentication
// TESTED WORKS
router.post('/', requireAuth, validateSpot, async (req,res) => {
    const {address,city,state,country,lat,lng,name,description,price} = req.body

    const createdSpot = await Spot.create({ownerId:req.user.id,address,city,state,country,lat,lng,name,description,price})
    
    res.statusCode = 201
    res.json(createdSpot)
})

// Get all Spots owned by the Current User
// Requires Authentication
// TESTED WORKS 
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
// TESTED WORKS
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
            useableSpot.avgStarRating = parseInt((total/len).toFixed(1))
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
// Requires authentication
// Spot must be owned by current user
// TESTED WORKS
router.post('/:spotId/images', requireAuth, validateSpotImage, async(req,res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const {url,preview} = req.body
    if(spot){
        if(spot.ownerId == req.user.id){
            const spotImage = await SpotImage.create({
                spotId:req.params.spotId,
                url,
                preview
            })

            const useableSpotImage = spotImage.toJSON()
            delete useableSpotImage.spotId
            delete useableSpotImage.createdAt
            delete useableSpotImage.updatedAt

            res.json(useableSpotImage)
        }
        else{
            res.statusCode = 403
            res.json({"message":"Forbidden","StatusCode":res.statusCode})
        }
    }
    else{
        res.statusCode = 404
        res.json({"message":"Spot couldn't be found","StatusCode":res.statusCode})
    }
    
    
})

// Get all bookings for a spot based on the spots id
// Requires authentication
// Return booking info (nothing about user that booked) if not owner of spot
// Return booking info+user info for booking if spot is owned by user
// Completed //refactor please
router.get('/:spotId/bookings', requireAuth, async(req,res) => {
   const spot = await Spot.findByPk(req.params.spotId)
   if(spot){ // if spot exists 
    if(spot.ownerId === req.user.id){ // if user owns the spot
        const bookings = await Booking.findAll({ where:{spotId:req.params.spotId},include:{model:User} })
        res.statusCode = 200
        res.json({Bookings:bookings})
    }else{ // if user doesnt own the spot 
        const bookings = await Booking.findAll({ where: {spotId:req.params.spotId }, attributes: ['spotId','startDate','endDate']})
        res.statusCode = 200
        res.json({ Bookings:bookings })
    }
   }else{ // if spot cant be found
    res.statusCode = 404
    res.json({"message":"Spot couldn't be found","statusCode":res.statusCode})
   }
})

// Create a Booking from a spot based on the spot id
// Requires authenticaiton
// Spot must NOTT belong to user
// In progress
router.post('/:spotId/bookings', requireAuth, async(req,res) => {
    const spot = await Spot.findOne({where:{id:req.params.spotId}},{attributes:['ownerId']})
    const spotDates = await Booking.findAll({where:{spotId:req.params.spotId},attributes:['id','startDate','endDate']})

    const currentDate = new Date(Date.now())
    const {startDate,endDate} = req.body
    useableStartDate = new Date(startDate)
    useableEndDate = new Date(endDate)
    
    if(spot){ //if spot exists

        if(useableStartDate>=useableEndDate){ // Start date cannot come after end date
            res.statusCode = 400
            res.json({
                "message": "Validation error",
                "statusCode": res.statusCode,
                "errors": {
                    "endDate": "endDate cannot come before startDate"
            }
        })
        }
        if(useableEndDate<currentDate){ // Cannot modify past bookings
            res.statusCode = 403
            res.json({
                "message": "Past bookings can't be modified",
                "statusCode": res.statusCode
            })
        }
        spotDates.forEach(date => {
            if((date.startDate <= useableStartDate && date.endDate >= useableStartDate)){
                res.statusCode = 403
                res.json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "statusCode": res.statusCode,
                    "errors": {
                      "startDate": `Start date ->(${date.startDate}) conflicts with an existing booking`,
                    }
                  })
            }
            if((date.startDate <= useableEndDate && date.endDate >= useableEndDate)){
                res.statusCode = 403
                res.json({
                    "message": "Sorry, this spot is already booked for the specified dates",
                    "statusCode": res.statusCode,
                    "errors": {
                      "endDate": `End date ->(${date.endDate}) conflicts with an existing booking`
                    }
                  })
            }
        })

        if(!(spot.ownerId == req.user.id)){ //if user does not own spot
            const newBooking = await Booking.create({
                spotId:req.params.spotId,
                userId:req.user.id,
                startDate,
                endDate
            })
            res.statusCode = 200
            res.json({bookings:newBooking})
        }else{ // You own this listing
            res.statusCode = 403
            res.json({"message": " 'Forbidden' You own this listing. You cannot make booking for your own bookings at this time","statusCode": res.statusCode})
        }
    }else{ // Spot does not exist
        res.statusCode = 404
        res.json({"message": "This spot does not exist","statusCode": res.statusCode})
    }

})

// Get all reviews by a spots id
// DOESNT REQUIRE AUTHENTICATION 
// TESTED WORKS
router.get('/:spotId/reviews', async (req,res) => {
    const spotReview = await Review.findByPk(req.params.spotId, {
        include:[
        {
            model:User,
            attributes:['id','firstName','lastName']
        },
        {
            model:ReviewImage,
            attributes:['id','url']
        }
    ]
    })
    if(spotReview){
        res.statusCode = 200
        res.json({Reviews:[spotReview]})
    }else{
        res.statusCode = 404
        res.json({"message":"Spot couldn't be found","StatusCode":res.statusCode})
    }
    
})

// Edit a Spot
// Require authentication
// Spot must be owned current user
// TESTED WORKS
router.put('/:spotId',requireAuth, validateSpot, async (req,res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const {address,city,state,country,lat,lng,name,description,price} = req.body
    if(spot){
        if(spot.ownerId == req.user.id){
            await spot.update({address,city,state,country,lat,lng,name,description,price})
            res.json(spot) 
        }else{
            res.statusCode = 403
            res.json({"message":"Forbidden","StatusCode":res.statusCode})
        }
    }else{
        res.statusCode = 404
        res.json({"message":"Spot couldn't be found","StatusCode":res.statusCode})
    }
})

// Create a review for a spot based on a spots id
// Require authentication
// IN PROGRESS //coming back to it later *** ***  **   *    *  *  * *  **  * * * * * * * * * * * * * *
router.post('/:spotId/reviews', requireAuth, async(req,res) => {
    // const {review,stars} = req.body
    // const spot = await Spot.findByPk(req.params.spotId)
    // if(!spot){
    //     res.statusCode = 404
    //     res.json({"message":"Spot couldn't be found","statusCode":res.statusCode})
    // }
    // const haveYouReviewed = await Review.findByPk(req.user.id)
    // if(haveYouReviewed.spotId === res.params.spotId){
        
    // }
    // if(!haveYouReviewed){
    //     const newReview = await Review.create({spotId:req.params.spotId,userId:req.user.id,review,stars})
    //     res.statusCode = 201
    //     res.json(newReview)
    // }else{
    //     res.statusCode = 403
    //     res.json({"message":"User already has a review for this spot","statusCode":res.statusCode})
    // }
    const spot = await Spot.findByPk(req.params.spotId)
    const {review,stars} = req.body
    const reviews = await Review.findAll({
        where:{
            userId:req.user.id,
            spotId:req.params.spotId
        }
    })
    if(!spot){
        res.statusCode = 404
        res.json({"message":"Spot couldn't be found","statusCode":res.statusCode})
    }
    else if(reviews.length){
        res.statusCode = 403
        res.json({"message":"User already has a review for this spot","statusCode":res.statusCode})
    }else{
        const newReview = await Review.create({spotId:req.params.spotId,userId:req.user.id,review,stars})
        res.statusCode = 201
        res.json(newReview)
    }
})

// Delete a Spot
// Require authentication
// Spot must belong to current user
// TESTED WORKS
router.delete('/:spotId',requireAuth, async (req,res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    
    if(spot){
        console.log(spot.dataValues.ownerId == req.user.id)
        if(spot.ownerId == req.user.id){
            await spot.destroy();
            res.statusCode = 200
            res.json({"message":"Successfully deleted","statusCode":res.statusCode})
        }else{
            res.statusCode = 403
            res.json({"message":"Forbidden","StatusCode":res.statusCode})
        }
    }
    else{
        res.statusCode = 404
        res.json({"message":"Spot couldn't be found","StatusCode":res.statusCode})
    }
})




module.exports = router;