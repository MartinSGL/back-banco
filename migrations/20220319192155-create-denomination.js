'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Denominations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(10)
      },
      name: {
        allowNull:false,
        type: Sequelize.STRING
      },
      value: {
        allowNull:false,
        type: Sequelize.FLOAT
      },
      deletedAt:{
        allowNull: true,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Denominations');
  }
};