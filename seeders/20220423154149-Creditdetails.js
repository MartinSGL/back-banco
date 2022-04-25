'use strict';
const creditdetail = require('../models').Creditdetail
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let credits = [
      {name:'premium',interest:0.05,debterms:24,extra_charge:100},
      {name:'standar',interest:0.10,debterms:24,extra_charge:200},
    ]

      await creditdetail.bulkCreate(credits);
  
  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('Creditdetails', null, {});
     
  }
};
