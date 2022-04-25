const cards = require("../models").Card;
const replacements = require("../models").Replacement;

const { Op } = require("sequelize");

const { sequelize } = require("../models");

const { resOk, resError } = require("../helpers/responses");

const {
  OK,
  ERROR,
  UNAUTHORIZED,
  VALIDATION,
  NOT_FOUND,
} = require("../helpers/status");

module.exports = {
  async create(req, res) {
    try {
      //iniciar transaccion
      const result = await sequelize.transaction(async (t) => {
        let rand_3 = Math.ceil(Math.random() * (999 - 100) + 100).toString(),
          date_13 = Date.now().toString();
        let no_card = rand_3 + date_13;

        const exp_date = new Date();
        exp_date.setFullYear(exp_date.getFullYear() + 3);

        let data = await cards.findOne({
            where: { id: req.params.id }}
        );

        if (data === null)
          return res.status(ERROR).json(resError("Card not found"));

        else{
             const cardNew = await cards.create(
               {
                 ...req.body.card,
                 AccountId: data.AccountId,
                 ExecutiveId: req.session.id,
                 card_number: no_card,
                 expiration_date: exp_date,
               },
               { transaction: t }
             );

             await replacements.create(
               {
                 CardId: cardNew.id,
                 reason: req.body.replacement.reason,
               },
               { transaction: t }
             );

             await cards.destroy(
               {
                 where: { id: req.params.id },
                 returning: true,
                 plain: true,
               },
               { transaction: t }
             );

             return res.status(OK).json(resOk("card created"));
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  },

  async update(req, res) {
    try {

      let nip = req.body.nip;
      console.log(nip);
      let data = await cards.update({nip}, {
        where: {
          id: req.params.id,
        },
      });
      //si no encuentra ningun registro regresar un estatus OK (200), data en null y nombre del modelo
      if (data === null) return res.status(OK).json(resOk(null));
      //si si encuentra registros mandardar los registros en un json
      return res.status(OK).json(resOk(data));
    } catch (error) {
      //si se comete un error mandar un status ERROR = 400
      return res.status(ERROR).send(resError(error));
    }
  },

  // do a logical delete of the client with the id
  async destroy(req, res) {
    try {
      //soft delete the client with the id
      let data = await cards.destroy({
        where: { id: req.params.id },
        returning: true,
        plain: true,
      });
      //si no encuentra ningun registro regresar un estatus OK (200), data en null y nombre del modelo
      if (data === null) return res.status(OK).json(resOk(null));
      //si si encuentra registros mandardar los registros en un json
      return res.status(OK).json(resOk(data));
    } catch (error) {
      //si se comete un error mandar un status ERROR = 400
      return res.status(ERROR).send(resError(error));
    }
  },
};
