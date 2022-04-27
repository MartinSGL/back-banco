//modelo requerido
const mortgages = require("../models").Mortgage;
const interest = require("../models").Interest;

//resOk pide dos parametros (data y nombre del modelo)
//resError pide dos parametros (error y data)
const { resOk, resError } = require("../helpers/responses");
//revisar el helper para ver el numero de estatus
const {
  OK,
  ERROR,
  UNAUTHORIZED,
  VALIDATION,
  NOT_FOUND,
} = require("../helpers/status");

const modelName = "mortgages";

module.exports = {
  async index(req, res) {
    try {
      let data = await mortgages.findAll({}); //buscar todos los registros con deletedAt = null
      //si no encuentra ningun registro regresar un estatus OK (200), data en null y nombre del modelo
      if (data === null) return res.status(OK).json(resOk(null));
      //si si encuentra registros mandardar los registros en un json
      return res.status(OK).json(resOk(data));
    } catch (error) {
      //si se comete un error mandar un status ERROR = 400
      return res.status(ERROR).send(resError(error));
    }
  },
  //show by id
    async show(req, res) {
        try {
            let data = await mortgages.findOne({
              where: {
                id: req.params.id,
              },
            });
            if (data === null) return res.status(NOT_FOUND).json(resOk(null));
            return res.status(OK).json(resOk(data));
        } catch (error) {
            //regresar estatus ERROR y respuesta incorrecta
            return res.status(ERROR).send(resError(error));
        }
    },

  async update(req, res) {
    try {
      let { id } = req.params; // obtener el id destructurado del parametro enviado por la URL
      let idFound = await mortgages.findOne({ where: { id } }); //comprobar si existe el id en la base de datos
      //regresar error NOT_FOUND = 404 en caso de no encontrar
      if (idFound === null)
        return res.status(NOT_FOUND).json(resOk(null, modelName));
      //actualizar los parametros enviados en req.body recuerda que para utilizar req.body sin destructurar
      //los parametros enviados se deben llamar igual en base de datos y desde el formulario enviado (name)
      let [, data] = await mortgages.update({...req.body,aproved_date:Date.now()}, {
        where: { id },
        returning: true,
        plain: true,
      });
      //regresar estatus OK y respuesta correcta
      return res.status(OK).json(resOk(data));
    } catch (error) {
      //si se comete un error mandar un status ERROR = 400
      return res.status(ERROR).json(resError(error));
    }
  },
  //destroy using soft delete
  async destroy(req, res) {
    try {
      let { id } = req.params; // obtener el id destructurado del parametro enviado por la URL
      let idFound = await mortgages.findOne({ where: { id } }); //comprobar si existe el id en la base de datos
      //regresar error NOT_FOUND = 404 en caso de no encontrar
      if (idFound === null)
        return res.status(NOT_FOUND).json(resOk(null, modelName));
      //eliminar el registro
      let [, data] = await mortgages.destroy({
        where: { id },
        returning: true,
        plain: true,
      });
      //regresar estatus OK y respuesta correcta
      return res.status(OK).json(resOk("deleted"));
    } catch (error) {
      //si se comete un error mandar un status ERROR = 400
      return res.status(ERROR).json(resError(error));
    }
  }
};
