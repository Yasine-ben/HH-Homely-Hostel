'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User)
      Spot.hasMany(models.Booking,{foreignKey:'spotId'})
      Spot.hasMany(models.SpotImage, {foreignKey:'spotId'})
      Spot.belongsToMany(models.User, {
        through: 'Review',
        otherKey:'userId',
        foreignKey:'spotId'
      })
      Spot.belongsToMany(models.User,{
        through:'Booking',
        otherKey:'userId',
        foreignKey:'spotId'
      })
      //look up as keyword as:'user_from_review'
    }
  }
  Spot.init({
    ownerId: {
      type:DataTypes.INTEGER,
      references:{model:Users,key:'id'},
      allowNull:false,
      onDelete:"CASCADE"
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};