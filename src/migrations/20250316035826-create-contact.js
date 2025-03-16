'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING,
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
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Contacts');
  }
};