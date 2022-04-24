'use strict';
const account = require('../models').Account
module.exports = {
  async up (queryInterface, Sequelize) {
    let accounts = [
      {
        type:"credit",
        amount: "100",
        ExecutiveId: "1",
        ClientId: "1",
      },
      {
        type:"debit",
        amount: "200",
        ExecutiveId: "1",
        ClientId: "2",
      },
      {
        type:"credit",
        amount: "300",
        ExecutiveId: "1",
        ClientId: "3",
      },
      {
        type:"credit",
        amount: "400",
        ExecutiveId: "1",
        ClientId: "4",
      },
      {
        type:"credit",
        amount: "500",
        ExecutiveId: "1",
        ClientId: "5",
      }
    ]

    
    await account.bulkCreate(accounts);
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Acounts", null, {});
  }
};

