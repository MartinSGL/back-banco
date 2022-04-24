'use strict';
const commission = require('../models').Commission
module.exports = {
  async up (queryInterface, Sequelize) {

    await commission.create({name:'first-commission',amount:0.01}) 
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Commissions', null, {});
     
  }
};
