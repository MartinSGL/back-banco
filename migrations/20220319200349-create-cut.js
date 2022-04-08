'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cuts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      total: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      differences: {
        allowNull: false,
        type: Sequelize.FLOAT,
        default:0
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM("inital","final","especial")
      },
      CashboxId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Cashboxes',
          key:'id'
        },
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
      },
      ExecutiveId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Executives',
          key:'id'
        },
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
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
    await queryInterface.dropTable('Cuts');
  }
};