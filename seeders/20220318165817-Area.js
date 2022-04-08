'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let areas = [
      // {uuid:uuidv4(),name:'Manager-module',createdAt:new Date(),updatedAt:new Date()},
      {name:'Manager-module',createdAt:new Date(),updatedAt:new Date()},
      {name:'Executive-module',createdAt:new Date(),updatedAt:new Date()},
      {name:'Cashier-module',createdAt:new Date(),updatedAt:new Date()},
    ]

    await queryInterface.bulkInsert('Areas',areas, {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Areas', null, {});
     
  }
};
