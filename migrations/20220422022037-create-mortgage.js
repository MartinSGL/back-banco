'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Mortgages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      solicited_date: {
        type: Sequelize.DATE
      },
      aproved_date: {
        type: Sequelize.DATE
      },
      solicited_amount: {
        type: Sequelize.FLOAT
      },
      aproved_amount: {
        type: Sequelize.FLOAT
      },
      InterestId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Interests',
          key:'id'
        },
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
      },
      AccountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Accounts',
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
    await queryInterface.dropTable('Mortgages');
  }
};