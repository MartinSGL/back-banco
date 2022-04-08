'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Branches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull:false,
        type: Sequelize.STRING
      },
      address: {
        allowNull:false,
        type: Sequelize.STRING
      },
      ceo: {
        allowNull:false,
        type: Sequelize.STRING
      },
      description: {
        allowNull:false,
        type: Sequelize.STRING
      },
      security: {
        allowNull:false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Branches');
  }
};