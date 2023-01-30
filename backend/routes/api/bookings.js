// backend/routes/api/reviews.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot,Review,ReviewImage,Booking,User,SpotImage,sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Delete a booking
// Requires authentication
// Booking must belong to the current user
// Complete
router.delete('/:bookingId',requireAuth, async(req,res) => {
    const booking = await Booking.findAll({where:{id:req.params.bookingId}})
        //res.json(booking)
        if(booking[0]){
            if(booking[0].userId == req.user.id){
                await booking[0].destroy()
                res.statusCode = 200
                res.json({"message":"Successfully deleted","statusCode":res.statusCode})
            }else{
                res.statusCode = 403
                res.json({"message":"Forbidden","statusCode":res.statusCode})
            }
        }else{
            res.statusCode = 404
            res.json({"message":"Booking couldn't be found","statusCode":res.statusCode})
        }
})

// Edit a booking
// Require authentication
// Booking must belong to current user
// *** Add in date validator ***
// Complete not tested tho
router.put('/:bookingId',requireAuth, async(req,res) => {
    const booking = await Booking.findByPk(req.params.bookingId)
    
    const spotDates = await Booking.findAll({where:{spotId:booking.spotId},attributes:['id','startDate','endDate']})
    
    // res.json(spotStartDates)

    const currentDate = new Date(Date.now())
    const {startDate,endDate} = req.body
    useableStartDate = new Date(startDate)
    useableEndDate = new Date(endDate)

    //res.json({currentDate,useableStartDate,useableEndDate})
    if(booking){
        if(booking.userId === req.user.id){ // If user owns Booking

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

            const updatedBooking = await booking.update({startDate:useableStartDate,endDate:useableEndDate})
            res.json(updatedBooking)
        }else{ // If user doesnt own listing
            res.statusCode = 403
            res.json({"message": "Forbidden","statusCode": res.statusCode})
        }
    }else{// If booking doesnt exist
        res.statusCode = 404
        res.json({"message": "Booking couldn't be found","statusCode": res.statusCode})
    }
})

// Get all of the current users bookings
// Requires authentication
// Complete not tested 
router.get('/current', requireAuth, async(req,res) => {
    const userBookings = await Booking.findAll({where:{userId:req.user.id},include:[{model:Spot}]})
    let bookings = []
    if(userBookings){
        for(let reservation of userBookings){
            const previewImage = await Spot.findOne({
                where:{id:reservation.spotId},
                attributes:[],
            
                include:{model:SpotImage,attributes:['url'],
                where:{preview: true}}
            })
    
            let url = previewImage.toJSON().SpotImages[0]
            userBookings.forEach(reservation => {bookings.push(reservation.toJSON())})
            bookings.forEach(reservation => {
                reservation.Spot.previewImage = url.url
                delete reservation.Spot.description
                delete reservation.Spot.createdAt
                delete reservation.Spot.updatedAt
            })
        }
    }
    res.statusCode = 200
    res.json({Bookings:bookings})
})




module.exports = router;