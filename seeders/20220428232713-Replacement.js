'use strict';
const replacement = require('../models').Replacement
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await replacement.create({
      CardId: 1,
      reason: "stoled", 
    },
    {CardId: 1,
      reason:"expired", 
    },
    {
      CardId: 2,
      reason:"damaged",
    },
    {
      CardId: 3,
      reason: "lost",
    })
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Replacements', null, {});
     
  }
};
