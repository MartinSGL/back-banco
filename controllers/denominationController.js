
const denomination = require('../models').Denomination;
// const executive = require('../models').Executive;

module.exports = {
  async index(req, res) {
    // console.log("I'm in");
    try {
      let data = await denomination.findAll({});
      return res.json(data);
    }
    catch (error) {
      return res.status(400).send(error);
    }
  },

  async create(req, res) {
    let { id, name, value } = req.body;
    try {
      let data = await denomination.create({
        id,
        name,
        value
      });
      return res.json(data);
    }
    catch (error) {
      return res.status(400).send(error);
    }
  },

  async show(req, res) {
    let { id } = req.params;
    try {
      let data = await denomination.findOne({ where: { id } })
      return res.json(data);
    }
    catch (error) {
      return res.status(400).send(error);
    }

  },

  async update(req, res) {
    let { id } = req.params;
    let { name, value } = req.body;
    try {
      let data = await denomination.update({ name, value }, { where: { id } })
      return res.json(data);
    }
    catch (error) {
      return res.status(400).send(error);
    }
  },
  async destroy(req, res) {
    let { id } = req.params;
    try {
      let data = await denomination.destroy({ where: { id } })
      return res.json(data);
    }
    catch (error) {
      return res.status(400).send(error);
    }
  }
}