'use strict';
const concept = require('../models').Concept
module.exports = {
  async up (queryInterface, Sequelize) {
    await concept.bulkCreate([{name:'withdraw'},{name:'deposit'},{name:'payment'}]) 
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('Transactions', null, {})
    await queryInterface.bulkDelete('Concepts', null, {})
     
  }
};
