// backend/routes/api/spot-images.js
const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot,Review,ReviewImage,Booking,User,SpotImage,sequelize} = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Delete spot image
// Requires authentication
// Spot must belong to current user
// Complete
router.delete('/:imageId',requireAuth, async(req,res) => {
    const image = await SpotImage.findAll({where:{id:req.params.imageId},include:[{model:Spot}]})
    //res.json(image)
    if(image[0]){
        if(image[0].Spot.ownerId == req.user.id){
            delete image[0].spot
            await image[0].destroy()
            res.statusCode = 200
            res.json({"message":"Successfully deleted","statusCode":res.statusCode})
        }else{
            res.statusCode = 403
            res.json({"message":"Forbidden","statusCode":res.statusCode})
        }
    }else{
        res.statusCode = 404
        res.json({"message":"Spot Image couldn't be found","statusCode":res.statusCode})
    }
    
})


module.exports = router;