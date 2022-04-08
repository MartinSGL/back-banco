'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Executives', {
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
      lastname: {
        allowNull:false,
        type: Sequelize.STRING
      },
      userid: {
        allowNull:false,
        type: Sequelize.STRING,
        unique:true,
      },
      password: {
        allowNull:false,
        type: Sequelize.STRING
      },
      AreaId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:'Areas',
          key:'id'
        },
        onDelete:'RESTRICT',
        onUpdate:'CASCADE'

      },
      PositionId: {
        allowNull:false,
        type: Sequelize.INTEGER,
        references:{
          model:'Positions',
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
    await queryInterface.dropTable('Executives');
  }
};