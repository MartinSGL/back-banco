'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Branches', [{
      name: 'Bantexico',
      address: '5th floor, Av. Patria 888-4th, Loma Real, 45129 Zapopan, Jal',
      ceo:'Ing. Hector Ivan Yboa Espinoza',
      description:'ta bien bonito',
      security:'Comisión Nacional Bancaria y de Valores CNBV',
      createdAt:new Date(),
      updatedAt:new Date()
    }], {});
  
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Branches', null, {});
    
  }
};
