'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        allowNull: false,
        type: Sequelize.FLOAT
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
      CommissionId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Commissions',
          key:'id'
        },
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
      },
      ConceptId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Concepts',
          key:'id'
        },
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
      },
      CardId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Cards',
          key:'id'
        },
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
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
    await queryInterface.dropTable('Transactions');
  }
};