//modelo requerido
const documents = require("../models").Document;
const clients = require("../models").Client;

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

const modelName = "documents";

module.exports = {
  async create(req, res) {
    let { ClientId, document_url, type } = req.body;
    try {

      let dataClient = await clients.findOne({ where: { id: ClientId },include:[{model:documents}]});
      

      if (dataClient === null) return res.status(NOT_FOUND).json(resOk(null));
      // if the type in documents already exists then return error
      if (dataClient.Documents.find(doc => doc.type === type))
        return res.status(VALIDATION).json(resError("document repeted", modelName));



      
      let data = await documents.create({ ClientId, document_url, type });
      return res.json(data);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
  async update(req, res) {
    try {
      let { id } = req.params; // obtener el id destructurado del parametro enviado por la URL
      let idFound = await documents.findOne({ where: { id } }); //comprobar si existe el id en la base de datos
      //regresar error NOT_FOUND = 404 en caso de no encontrar
      if (idFound === null)
        return res.status(NOT_FOUND).json(resOk(null, modelName));
      //actualizar los parametros enviados en req.body recuerda que para utilizar req.body sin destructurar
      //los parametros enviados se deben llamar igual en base de datos y desde el formulario enviado (name)
      let [data] = await documents.update(req.body, {
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
      let idFound = await documents.findOne({ where: { id } }); //comprobar si existe el id en la base de datos
      //regresar error NOT_FOUND = 404 en caso de no encontrar
      if (idFound === null)
        return res.status(NOT_FOUND).json(resOk(null, modelName));
      //eliminar el registro
      let [, data] = await documents.destroy({
        where: { id },
        plain: true,
      });
      //regresar estatus OK y respuesta correcta
      return res.status(OK).json(resOk());
    } catch (error) {
      //si se comete un error mandar un status ERROR = 400
      return res.status(ERROR).json(resError(error));
    }
  },
};
