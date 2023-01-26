'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {

    // static async createSpot({ownerId,address,city,country,lat,lng,name,description,price}){
    //   const spot = await Spot.create({ownerId,address,city,country,lat,lng,name,description,price});
    //   //spot
    //   console.log(Spot.localScope('currentUser').findByPk(spot.id))
    //   return await Spot.localScope('currentUser').findByPk(spot.id)
    // }

    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey:"ownerId"})
      Spot.hasMany(models.SpotImage,{foreignKey:'spotId',onDelete:"CASCADE"})
      Spot.hasMany(models.Review, {foreignKey:'spotId',onDelete:"CASCADE"})

    }
  }
  Spot.init({
    ownerId: {
      type:DataTypes.INTEGER,
    
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lat: {
      type: DataTypes.DECIMAL(9,7),
      allowNull: false,
      validate: {
        min: -90,
        max: 90
      }
    },
    lng: {
      type: DataTypes.DECIMAL(10,7),
      allowNull: false,
      validate: {
        min: -180,
        max: 180
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50] //bob is the shortest name right? 
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(5,2),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};