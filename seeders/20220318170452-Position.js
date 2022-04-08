'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
   
    let position = [
      {name:'Manager',createdAt:new Date(),updatedAt:new Date()},
      {name:'Executive',createdAt:new Date(),updatedAt:new Date()},
      {name:'Cashier',createdAt:new Date(),updatedAt:new Date()},
    ]

    await queryInterface.bulkInsert('Positions', position, {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Positions', null, {});
     
  }
};
