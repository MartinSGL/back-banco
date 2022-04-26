'use strict';
const mortgage = require('../models').Mortgage
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await mortgage.create({
      solicited_date:new Date(),
      aproved_date:new Date(),
      solicited_amount:500000,
      aproved_amount:500000,
      InterestId:1,
      AccountId:3
    })
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Mortgages', null, {});
     
  }
};
