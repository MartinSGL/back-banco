'use strict';
const area = require('../models').Area
const {area_1,area_2,area_3} = require('./global-info/variables')
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let areas = [
      {name:area_1},
      {name:area_2},
      {name:area_3},
    ]

    await area.bulkCreate(areas);
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Areas', null, {});
     
  }
};
