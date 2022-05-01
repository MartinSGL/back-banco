'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Clients", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastname: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      gender: {
        allowNull: false,
        type: Sequelize.ENUM('0','1'),
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      number_ext: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      colony: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      postalcode: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      celphone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      landline: {
        type: Sequelize.STRING,
      },
      curp: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      rfc: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      no_ine: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      ExecutiveId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Executives",
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
    await queryInterface.dropTable('Clients');
  }
};