'use strict';
const denomination = require('../models').Denomination
module.exports = {
  async up (queryInterface, Sequelize) {
    let denominations = [
      {id:'m10c',name:'moneda 10 centavos',value:0.1},
      {id:'m50c',name:'moneda 50 centavos',value:0.5},
      {id:'m1p',name:'moneda 1 peso',value:1},
      {id:'m2p',name:'moneda 2 pesos',value:2},
      {id:'m5p',name:'moneda 5 pesos',value:5},
      {id:'m10p',name:'moneda 10 pesos',value:10},
      {id:'m20p',name:'moneda 20 pesos',value:20},
      {id:'b20p',name:'billete 20 pesos',value:20},
      {id:'b50p',name:'billete 50 pesos',value:50},
      {id:'b100p',name:'billete 100 pesos',value:100},
      {id:'b200p',name:'billete 200 pesos',value:200},
      {id:'b500p',name:'billete 500 pesos',value:500},
      {id:'b1000p',name:'billete 1000 pesos',value:1000},
    ]
    for (const el of denominations) {
      await denomination.create(el)
    }
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Denominations', null, {});
    
  }
};
