'use strict';
const position = require('../models').Position
module.exports = {
  async up (queryInterface, Sequelize) {
   
    let positions = [
      {name:'manager'},
      {name:'executive'},
      {name:'cashier'},
    ]

    await position.bulkCreate(positions);
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Positions', null, {});
     
  }
};
