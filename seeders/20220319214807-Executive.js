'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
      let executives = [
          {
            name:"Manuel Alejando",
            lastname:"Barba Gonzalez",
            userid:"manuel",
            password:"12345",
            AreaId:"1",
            PositionId:"1",
            BranchId:"1",
            createdAt:new Date(),
            updatedAt:new Date()
        },
      ]
      await queryInterface.bulkInsert('Executives', executives, {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Executives', null, {});
     
  }
};
