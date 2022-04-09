'use strict';
const area = require('../models').Area
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let areas = [
      {name:'manager-module'},
      {name:'executive-module'},
      {name:'cashier-module'},
    ]

    await area.bulkCreate(areas);
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Areas', null, {});
     
  }
};
