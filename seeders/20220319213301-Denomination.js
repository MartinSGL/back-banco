'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let denominations = [
      {id:'m10c',name:'moneda 10 centavos',value:0.1,createdAt:new Date(),updatedAt:new Date()},
      {id:'m50c',name:'moneda 50 centavos',value:0.5,createdAt:new Date(),updatedAt:new Date()},
      {id:'m1p',name:'moneda 1 peso',value:1,createdAt:new Date(),updatedAt:new Date()},
      {id:'m2p',name:'moneda 2 pesos',value:2,createdAt:new Date(),updatedAt:new Date()},
      {id:'m5p',name:'moneda 5 pesos',value:5,createdAt:new Date(),updatedAt:new Date()},
      {id:'m10p',name:'moneda 10 pesos',value:10,createdAt:new Date(),updatedAt:new Date()},
      {id:'m20p',name:'moneda 20 pesos',value:20,createdAt:new Date(),updatedAt:new Date()},
      {id:'b30p',name:'billete 20 pesos',value:20,createdAt:new Date(),updatedAt:new Date()},
      {id:'b50p',name:'billete 50 pesos',value:50,createdAt:new Date(),updatedAt:new Date()},
      {id:'b100p',name:'billete 100 pesos',value:100,createdAt:new Date(),updatedAt:new Date()},
      {id:'b200p',name:'billete 200 pesos',value:200,createdAt:new Date(),updatedAt:new Date()},
      {id:'b500p',name:'billete 500 pesos',value:500,createdAt:new Date(),updatedAt:new Date()},
      {id:'b1000p',name:'billete 1000 pesos',value:1000,createdAt:new Date(),updatedAt:new Date()},
    ]

     await queryInterface.bulkInsert('Denominations', denominations,{});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Denominations', null, {});
    
  }
};
