'use strict';
const executive = require('../models').Executive
const branch = require('../models').Branch
const position = require('../models').Position
const area = require('../models').Area
module.exports = {
  async up (queryInterface, Sequelize) {
    let positionid = await position.findOne({where:{name:'manager'}}).id
    let areaid = await area.findOne({where:{name:'manager-module'}}).id
      let executives = [
          {
            name:"Manuel Alejando",
            lastname:"Barba Gonzalez",
            userid:"manuel",
            password:"12345",
            AreaId:areaid,
            PositionId:positionid,
        },
      ]
  
      let branchF = await branch.findOne({where:{name:'Bantexico'}})
      let executiveC = await executive.create(executives[0])
      console.log(branchF)
      return await executiveC.addBranch(branchF,{through:{date_init: '2022-04-08'}})                   
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Executives', null, {});
     await queryInterface.bulkDelete('BranchExecutives', null, {});
     
  }
};
