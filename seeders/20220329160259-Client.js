'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let client = [{
      name:'moises',
      lastname:'moreno castro',
      gender:'1',
      street:'en tu corazon',
      number_ext:12,
      colony:'viva cristo rey',
      postalcode:28400,
      city:'zapopan',
      municipality:'zapopan',
      state:'jalisco',
      celphone:'3311231234',
      landline:'3311231235',
      curp:'MOCMOOO419HNERSSA8',
      rfc:'MOCMOOO419AAA',
      no_ine:'123456789011223344',
      email:'moikas@gmail.com',
      ExecutiveId:2,
      createdAt:new Date(),
      updatedAt:new Date()

    },{
      name:'moises 2',
      lastname:'moreno castro',
      gender:'1',
      street:'en tu corazon',
      number_ext:12,
      colony:'viva cristo rey',
      postalcode:28400,
      city:'zapopan',
      municipality:'zapopan',
      state:'jalisco',
      celphone:'3311231234',
      landline:'3311231235',
      curp:'MOCMOOO419HNERSSA2',
      rfc:'MOCMOOO419AA2',
      no_ine:'123456789011223342',
      email:'moikas2@gmail.com',
      ExecutiveId:2,
      createdAt:new Date(),
      updatedAt:new Date()

    }]

    await queryInterface.bulkInsert('Clients', client, {});
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Clients', null, {});
     
  }
};
