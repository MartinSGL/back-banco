//modelo requerido
const cashbox= require('../models').Cashbox
//resOk pide dos parametros (data y nombre del modelo)
//resError pide dos parametros (error y data)
const {resOk,resError} = require('../helpers/responses')
//revisar el helper para ver el numero de estatus
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status')

const modelName = 'Cashbox'

module.exports = {
    async index(req,res){
        try{
            let data = await cashbox.findAll({}) //buscar todos los registros con deletedAt = null
            //si no encuentra ningun registro regresar un estatus OK (200), data en null y nombre del modelo
            if(data===null) return res.status(OK).json(resOk(null)) 
            //si si encuentra registros mandardar los registros en un json
            return res.status(OK).json(resOk(data))
        }catch(error){
            //si se comete un error mandar un status ERROR = 400
            return res.status(ERROR).send(resError(error));
        }
    }
}