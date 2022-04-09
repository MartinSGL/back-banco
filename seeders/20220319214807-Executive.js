'use strict';
const executive = require('../models').Executive
const branch = require('../models').Branch
const position = require('../models').Position
const area = require('../models').Area
const {branch_name} = require('./global-info/variables')
module.exports = {
  async up (queryInterface, Sequelize) {
    let positionF = await position.findOne({where:{name:'manager'}})
    let areaF = await area.findOne({where:{name:'manager-module'}})
      let executives = [
          {
            name:"Manuel Alejando",
            lastname:"Barba Gonzalez",
            userid:"manuel",
            password:"12345678",
            AreaId:areaF.id,
            PositionId:positionF.id,
        },
      ]
  
      let branchF = await branch.findOne({where:{name:branch_name}})
      let executiveC = await executive.create(executives[0])
      let executiveBranch = await executiveC.addBranch(branchF,{through:{date_init: '2022-04-08'}})               
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('BranchExecutives', null, {});
    await queryInterface.bulkDelete('Executives', null, {});
     
  }
};
