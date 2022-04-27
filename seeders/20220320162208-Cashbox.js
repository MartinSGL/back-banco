'use strict';
const cashbox = require('../models').Cashbox
module.exports = {
  async up (queryInterface, Sequelize) {
    let cashboxes = [
      {name:'box 1'},
      {name:'box 2'},
      {name:'box 3'},
      {name:'box 4'}
    ]
    await cashbox.bulkCreate(cashboxes);
    
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('DenominationCuts', null, {});
     await queryInterface.bulkDelete('Cuts', null, {});
     await queryInterface.bulkDelete('Cashboxes', null, {});
     
  }
};
