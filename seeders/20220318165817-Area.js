'use strict';
const area = require('../models').Area
const position = require('../models').Position
const {area_manager,area_executive_1,area_executive_2,area_cashier_1,area_cashier_2,position_1,position_2,position_3} = require('./global-info/variables')
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let manager = await position.findOne({where:{name:position_1}})
    let executive = await position.findOne({where:{name:position_2}})
    let cashier = await position.findOne({where:{name:position_3}})

    let areas = [
      {name:area_manager,PositionId:manager.id},
      {name:area_executive_1,PositionId:executive.id},
      {name:area_executive_2,PositionId:executive.id},
      {name:area_cashier_1,PositionId:cashier.id},
      {name:area_cashier_2,PositionId:cashier.id},
    ]

    await area.bulkCreate(areas);
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Areas', null, {});
     
  }
};
