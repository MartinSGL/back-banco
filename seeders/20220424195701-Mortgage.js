'use strict';
const mortgage = require('../models').Mortgage
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let mortgage = await mortgage.create(
      {solcited_date:new Date()},
      {aproved_date:new Date()},
      {solicited_amount:500000},
      {aproved_amount:500000},
      {InterestId:1},
      {AccountId:5}
    )
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Mortgage', null, {});
     
  }
};
