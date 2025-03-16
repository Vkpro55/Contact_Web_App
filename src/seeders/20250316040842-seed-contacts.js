const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const contacts = [];

    for (let i = 0; i < 50; i++) {
      contacts.push({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phoneNumber: `+91${faker.string.numeric(10)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("Contacts", contacts);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Contacts", null, {});
  },
};
