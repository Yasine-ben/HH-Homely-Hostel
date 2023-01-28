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
                res.statusCode = 404
                res.json({"message":"You do not own this booking","statusCode":res.statusCode})
            }
        }else{
            res.statusCode = 404
            res.json({"message":"Booking couldn't be found","statusCode":res.statusCode})
        }
})

// Edit a booking
// Require authentication
// Booking must belong to current user
// In Progress
router.put('/:bookingId',requireAuth, async(req,res) => {
    
})

// Get all of the current users bookings
// Requires authentication
// In Progress
router.get('/current', requireAuth, async(req,res) => {

})




module.exports = router;