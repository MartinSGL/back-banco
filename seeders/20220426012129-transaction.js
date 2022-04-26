'use strict';
const transaction = require('../models').Transaction
module.exports = {
  async up (queryInterface, Sequelize) {

     let transaccions = [{
        amount:20000,
        date:new Date(),
        CommissionId:1,
        ConceptId:4,
        ExecutiveId:2,
        CardId:1,
      },{
        amount:10000,
        date:new Date(),
        CommissionId:1,
        ConceptId:4,
        ExecutiveId:2,
        CardId:2,
      },{
        amount:500000,
        date:new Date(),
        CommissionId:1,
        ConceptId:4,
        ExecutiveId:2,
        CardId:3,
      }
    ]

    await transaction.bulkCreate(transaccions)
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Transactions', null, {});
     
  }
};
