'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        allowNull:false,
        type: Sequelize.STRING
      },
      expire_date: {
        allowNull:false,
        type: Sequelize.DATE
      },
      ClientId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:'Clients',
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
    await queryInterface.dropTable('Tokens');
  }
};