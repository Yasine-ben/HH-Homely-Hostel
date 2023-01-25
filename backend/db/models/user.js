'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email } = this; // context will be the User instance
      return { id, username, email };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ firstName,lastName, username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    } 

    static associate(models) {
      // define association here
      User.hasMany(models.Spot,{foreignKey:"ownerId", onDelete: 'CASCADE',  hooks: true })
      User.hasMany(models.Booking,{foreignKey:"userId", onDelete: 'CASCADE',  hooks: true })
      User.hasMany(models.Review,{foreignKey:"userId"})
      User.belongsToMany(models.Spot, {
        through: 'Booking',
      })
      User.belongsToMany(models.Spot,{
        through:'Review',
      })

    }
  };

  User.init({
    firstName:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
          mustBeLetters(value){
            let split = value.toString()
            split = split.split("")
            for(let letters of split){
              if(letters.toLowerCase() === letters.toUpperCase()){
                throw new Error("Must contain only letters")
              }
            }
          }
        }
      },
      lastName:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
          mustBeLetters(value){
            let split = value.toString()
            split = split.split("")
            for(let letters of split){
              if(letters.toLowerCase() === letters.toUpperCase()){
                throw new Error("Must contain only letters")
              }
            }
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword","createdAt","updatedAt"] }
        },  //added createdAt and updatedAt exclusions
        loginUser: {
          attributes: {}
        }
      }
    }
  );
  return User;
};