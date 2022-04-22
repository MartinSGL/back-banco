'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AccountCreditdetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      AccountId: {
        primaryKey:true,
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:'Accounts',
          key:'id'
        },
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'
      },
      CreditdetailId: {
        primaryKey:true,
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:'Creditdetails',
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
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AccountCreditdetails');
  }
};