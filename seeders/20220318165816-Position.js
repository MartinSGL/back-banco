'use strict';
const position = require('../models').Position
const {position_1,position_2,position_3} = require('./global-info/variables')
module.exports = {
  async up (queryInterface, Sequelize) {
   
    let positions = [
      {name:position_1},
      {name:position_2},
      {name:position_3},
    ]

    await position.bulkCreate(positions);
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Positions', null, {});
     
  }
};
