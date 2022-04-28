"use strict";
const client = require('../models').Client
module.exports = {
  async up(queryInterface, Sequelize) {
    await client.bulkCreate([
      {
        name: "Martin Salvador",
        lastname: "Gaytan Lugo",
        gender: "1",
        street: "Republica de cuba",
        number_ext: 12,
        colony: "Tlaquepaque centro",
        postalcode: 45500,
        city: "Guadalajara",
        municipality: "Tlaquepaque",
        state: "Jalisco",
        celphone: "1111111111",
        landline: "2222222222",
        curp: "GAPS530117HCMYRL10",
        rfc: "GAPS530117QWR",
        no_ine: "123456789112345673",
        email: "martingaytan.lugo@gmail.com",
        ExecutiveId: 1,
      },
      {
        name: "Kevin",
        lastname: "Baez",
        gender: "1",
        street: "Francisco",
        number_ext: 256,
        colony: "lomas del pozoyocle",
        postalcode: 78451,
        city: "Aviridis",
        municipality: "Avespina",
        state: "Nayarit",
        celphone: "8787254632",
        landline: "9521365478",
        curp: "GAPS530117HCMYRL07",
        rfc: "GAPS530117QWW",
        no_ine: "123456789112345679",
        email: "kevin.paez1010@gmail.com",
        ExecutiveId: 1,
      },
      {
        name: "Jose",
        lastname: "Gaitan",
        gender: "1",
        street: "Tijuana",
        number_ext: 122,
        colony: "Nueva California",
        postalcode: 27089,
        city: "Torreon",
        municipality: "Torreon",
        state: "coahuila",
        celphone: "8712090393",
        landline: "87112090393",
        curp: "GAPS530117HCMYRL06",
        rfc: "GAPS530117QWE",
        no_ine: "123456789112345678",
        email: "gaitan138@gmail.com",
        ExecutiveId: 1,
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tokens", null, {});
    await queryInterface.bulkDelete("Clients", null, {});
  },
};
