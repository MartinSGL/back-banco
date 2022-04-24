'use strict';
const account = require('../models').Account
module.exports = {
  async up (queryInterface, Sequelize) {

     await account.addCreditdetails(1,[4]);
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('AccountCreditdetails', null, {});
     
  }
};
