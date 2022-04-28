//modelo requerido
const beneficiary= require('../models').Beneficiary;
const accounts = require('../models').Account; 
//resOk pide dos parametros (data y nombre del modelo)
//resError pide dos parametros (error y data)
const {resOk,resError} = require('../helpers/responses')
//revisar el helper para ver el numero de estatus
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status')

const modelName = 'Beneficiary'

module.exports = {
  async create(req, res) {
    try {
      let accountdata = await accounts.findOne({
        where: {
          id: req.body.AccountId,
        },
        include: [
          {
            model: beneficiary,
          },
        ],
      });
      console.log(accountdata.Beneficiaries.length);

      if (accountdata.Beneficiaries.length >= 3) {
        return res.status(VALIDATION).json({
          error: "The mortgage already has 3 beneficiaries",
        });
      }
      let percentage = 0;
      for (let i = 0; i < accountdata.Beneficiaries.length; i++) {
        percentage += parseInt(accountdata.Beneficiaries[i].percentage);
      }
      if (percentage + parseInt(req.body.percentage) > 100) {
        return res.status(VALIDATION).json({
          error: "The percentage of the beneficiaries is greater than 100",
        });
      }

      //crear registro con los parametros de req.body, recuerda que para utilizar req.body sin destructurar
      //los parametros enviados se deben llamar igual en base de datos y desde el formulario enviado

      let data = await beneficiary.create(req.body);
      return res.status(OK).json(resOk(data));
    } catch (error) {
      return res.status(ERROR).json(resError(error));
    }
  },

  async update(req, res) {
    try {
      const beneficiary = await beneficiary.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      resOk(res, OK, modelName, beneficiary);
    } catch (error) {
      resError(res, ERROR, modelName, error);
    }
  },

  //get a beneficiary by id
  //exclude deletedAt and createdAt fields
  async destroy(req, res) {
    try {
      //soft delete the client with the id
      let data = await beneficiary.destroy({
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
