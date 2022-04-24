"use strict";
const beneficiarie = require('../models').Beneficiarie
module.exports = {
  async up(queryInterface, Sequelize) {
    await beneficiarie.bulkCreate([
      {
        name: "Juan",
        lastname: "Perez",
        relation: "Hijo",
        percentage: "100",
        birth_date: "2020-04-24",
        phone: "1111111111",
        email: "gaitan138@gmail.com",
        AccountId: 1,
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
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Beneficiaries", null, {});
  },
};
