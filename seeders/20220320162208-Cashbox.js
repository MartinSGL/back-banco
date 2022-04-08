'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let cashboxes = [
      {name:'box 1',createdAt:new Date(),updatedAt:new Date()},
      {name:'box 2',createdAt:new Date(),updatedAt:new Date()},
      {name:'box 3',createdAt:new Date(),updatedAt:new Date()},
      {name:'box 4',createdAt:new Date(),updatedAt:new Date()},
      {name:'Customer services',createdAt:new Date(),updatedAt:new Date()}
    ]
    await queryInterface.bulkInsert('Cashboxes', cashboxes, {});
    
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('Cashboxes', null, {});
     
  }
};
