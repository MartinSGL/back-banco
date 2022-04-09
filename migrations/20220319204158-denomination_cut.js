'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('DenominationCuts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique:true,
        type: Sequelize.INTEGER
      },
      DenominationId: {
        primaryKey:true,
        allowNull: false,
        type: Sequelize.STRING(10),
        references:{
          model:'Denominations',
          key:'id'
        },
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
      },
      CutId: {
        primaryKey:true,
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Cuts',
          key:'id'
        },
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('DenominationCuts');
  }
};
