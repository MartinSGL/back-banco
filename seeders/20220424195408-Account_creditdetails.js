'use strict';
const account = require('../models').Account
module.exports = {
  async up (queryInterface, Sequelize) {

    let accountF = await account.findOne({where:{type:'credit'}})
    await accountF.addCreditdetails(1,[4]);
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('AccountCreditdetails', null, {});
     
  }
};
