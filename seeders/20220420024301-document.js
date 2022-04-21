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
        type: "address",
        ClientId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        document_url: "DataTypes.STRING",
        type: "income",
        ClientId: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        document_url: "DataTypes.STRING",
        type: "address",
        ClientId: "5",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        document_url: "DataTypes.STRING",
        type: "ine",
        ClientId: "4",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Documents", null, {});
  },
};

