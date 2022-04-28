//model required
const denomination = require('../models').Denomination;

module.exports = {
  //all registered denominations
  async index(req, res) {
    try {
      let data = await denomination.findAll({});//find all the registres with deletedAt = null
      //if there are any registers, data null and model name
      //if registres are found, registres in json format and status OK (200)
      return res.json(data);
    }
    catch (error) {
      //if there are any error, send status ERROR (400)
      return res.status(400).send(error);
    }
  },
  //create a new denomination
  async create(req, res) {
    //variables needed to create a new denomination
    let { id, name, value } = req.body;
    try {
      //create register with the parameters from req.body
      let data = await denomination.create({
        id,
        name,
        value
      });
      //if the register is created, return data created
      return res.json(data);
    }
    catch (error) {
      //if there are any error, send status ERROR (400)
      return res.status(400).send(error);
    }
  },
  // find a denomination by id
  async show(req, res) {
    //variables needed to find a denomination by id
    let { id } = req.params;
    try {
      //find the register with the id sent by URL
      let data = await denomination.findOne({ where: { id } })
      //if the register is found, return data found
      return res.json(data);
    }
    catch (error) {
      //if there are any error, send status ERROR (400)
      return res.status(400).send(error);
    }

  },
  // update a denomination
  async update(req, res) {
    //variables needed to update a denomination
    let { id } = req.params;
    let { name, value } = req.body;
    try {
      //update register with the parameters sent
      let data = await denomination.update({ name, value }, { where: { id } })
      //if the register is updated, return data updated
      return res.json(data);
    }
    catch (error) {
      //if there are any error, send status ERROR (400)
      return res.status(400).send(error);
    }
  },
  // delete a denomination
  async destroy(req, res) {
    //variables needed to delete a denomination
    let { id } = req.params;
    try {
      //delete register with the id sent by URL
      let data = await denomination.destroy({ where: { id } })
      //if the register is deleted, return data deleted
      return res.json(data);
    }
    catch (error) {
      //if there are any error, send status ERROR (400)
      return res.status(400).send(error);
    }
  }
}