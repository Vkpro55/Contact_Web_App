'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Contact.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      len: {
        args: [13, 13],
        msg: "Phone number must be exactly 13 digits long (including country code)"
      },
      isNumeric: {
        args: true,
        msg: "Phone number must be numeric after the '+' sign"
      },
      isPhoneNumber: function (value) {
        if (!/^\+91\d{10}$/.test(value)) {
          throw new Error('Invalid phone number format.  Must be in +91XXXXXXXXXX format');
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};