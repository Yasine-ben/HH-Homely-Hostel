'use strict';
const {
  Model
} = require('sequelize');
// import {Spots} from './spot' //not sure
// import {Users} from './user' //not sure
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User)
      Booking.belongsTo(models.Spot)
    }
  }
  Booking.init({
    spotId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{model:Spots,key:'id'},
      onDelete:"CASCADE"
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{model:Users,key:'id'},
      onDelete:"CASCADE"
    },
    startDate: {
      type:DataTypes.DATE,
      allowNull:false,
    },
    endDate: {
      type:DataTypes.DATE,
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};