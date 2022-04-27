"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Documents", [
      {
        document_url: "DataTypes.STRING",
        type: "ine",
        ClientId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        document_url: "DataTypes.STRING",
        type: "ine",
        ClientId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        document_url: "DataTypes.STRING",
        type: "ine",
        ClientId: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Documents", null, {});
  },
};

