"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Cards", [
      {
        card_number: "1234567890123456",
        nip: "44232",
        expiration_date: "2022-04-01",
        ExecutiveId: 1,
        AccountId: 1,
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        card_number: "1092384729384729",
        nip: "482384",
        expiration_date: "2025-02-11",
        ExecutiveId: 1,
        AccountId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        card_number: "9823472938472938",
        nip: "234823",
        expiration_date: "2022-12-17",
        ExecutiveId: 1,
        AccountId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cards", null, {});
  },
};



