'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      card_number: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      nip: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      expiration_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      ExecutiveId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Executives",
          key: "id",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      AccountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Accounts",
          key: "id",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cards');
  }
};