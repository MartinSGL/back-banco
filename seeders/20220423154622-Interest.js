'use strict';
const interest = require('../models').Interest
module.exports = {
  async up (queryInterface, Sequelize) {

    let interests = [
      {name:'standar - 10 years',debterms:120,interest:0.10,extra_charge:1000},
      {name:'standar - 20 years',debterms:240,interest:0.15,extra_charge:1500},
      {name:'premium - 10 years',debterms:120,interest:0.05,extra_charge:1000},
      {name:'premium - 20 years',debterms:240,interest:0.10,extra_charge:1500},
    ]
     await interest.bulkCreate(interests)
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Mortgages', null, {})
    await queryInterface.bulkDelete('Interests', null, {})
    
  }
};
