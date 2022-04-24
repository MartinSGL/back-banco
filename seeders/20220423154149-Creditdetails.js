'use strict';
const creditdetail = require('../models').Creditdetail
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let credits = [
      {name:'premium',date:new Date(),insterest:0.05,extra_charge:100},
      {name:'standar',date:new Date(),insterest:0.10,extra_charge:200},
    ]

      await creditdetail.bulkCreate(credits);
  
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Creditdetails', null, {});
     
  }
};
