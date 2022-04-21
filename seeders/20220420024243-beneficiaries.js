"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Beneficiaries", [
      {
        name: "Juan",
        lastname: "Perez",
        relation: "Hijo",
        percentage: "100",
        birth_date: "2020-04-24",
        phone: "1111111111",
        email: "gaitan138@gmail.com",
        AccountId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Ricardo",
        lastname: "Torres",
        relation: "Hijo",
        percentage: "100",
        birth_date: "2020-04-24",
        phone: "9999999999",
        email: "ricardo@gmail.com",
        AccountId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Vicente",
        lastname: "Gaitan",
        relation: "Hijo",
        percentage: "100",
        birth_date: "2020-04-24",
        phone: "8888888888",
        email: "vicente@gmail.com",
        AccountId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Maria",
        lastname: "Cruz",
        relation: "Hija",
        percentage: "100",
        birth_date: "2020-04-24",
        phone: "7777777777",
        email: "maria@gmail.com",
        AccountId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
      {
        name: "Esteban",
        lastname: "Gonzalez",
        relation: "Hijo",
        percentage: "100",
        birth_date: "2020-04-24",
        phone: "6666666666",
        email: "esteban@gmail.com",
        AccountId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Beneficiaries", null, {});
  },
};
