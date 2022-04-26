//modelo requerido
const commission = require('../models').Commission
//resOk pide dos parametros (data y nombre del modelo)
//resError pide dos parametros (error y data)
const {resOk,resError} = require('../helpers/responses')
//revisar el helper para ver el numero de estatus
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status')

const modelName = 'Commission'

module.exports = {
    async index(req,res){
        try{
            let data = await commission.findAll({}) //buscar todos los registros con deletedAt = null
            //si no encuentra ningun registro regresar un estatus OK (200), data en null y nombre del modelo
            if(data===null) return res.status(OK).json(resOk(null)) 
            //si si encuentra registros mandardar los registros en un json
            return res.status(OK).json(resOk(data))
        }catch(error){
            //si se comete un error mandar un status ERROR = 400
            return res.status(ERROR).send(resError(error));
        }
    },

    //Crear comision y eliminar las anteriores anteriores
    async create(req,res){
        try{
            let data1 = await commission.findAll({});
            if (data1!=null){
                await commission.destroy({
                where:{},returning:true,plain:true
                });
            }
            //crear registro con los parametros de req.body, recuerda que para utilizar req.body sin destructurar
            //los parametros enviados se deben llamar igual en base de datos y desde el formulario enviado (name)
            let data = await commission.create(req.body);
            
            return res.status(OK).json(resOk(data));
        }catch(error){
            //si se comete un error mandar un status ERROR = 400
            return res.status(ERROR).send(resError(error));
        }
    },
    // async update(req,res){
    //     try{
    //         let {id} = req.params // obtener el id destructurado del parametro enviado por la URL
    //         let idFound = await commission.findOne({where:{id}}) //comprobar si existe el id en la base de datos
    //         //regresar error NOT_FOUND = 404 en caso de no encontrar
    //         if (idFound===null) return res.status(NOT_FOUND).json(resOk(null,modelName)) 
    //         //actualizar los parametros enviados en req.body recuerda que para utilizar req.body sin destructurar
    //         //los parametros enviados se deben llamar igual en base de datos y desde el formulario enviado (name)
    //         let [,data] = await commission.update(req.body,{
    //             where:{id},returning:true,plain:true
    //         })
    //         //regresar estatus OK y respuesta correcta
    //         return res.status(OK).json(resOk(data));
    //     }catch(error){
    //         //si se comete un error mandar un status ERROR = 400
    //         return res.status(ERROR).json(resError(error));
    //     }
    // },
    // async destroy(req,res){
    //     try{
    //         let {id} = req.params // obtener el id destructurado del parametro enviado por la URL
    //         let idFound = await commission.findOne({where:{id}}) //comprobar si existe el id en la base de datos
    //         //regresar error NOT_FOUND = 404 en caso de no encontrar
    //         if (idFound===null) return res.status(NOT_FOUND).json(resOk(null,modelName)) 
            // let data = await commission.destroy({
            //     where:{id: id},returning:true,plain:true
            // });
    //         //regresar estatus OK y respuesta correcta
    //         return res.status(OK).json(resOk(data));
    //     }catch(error){
    //         //si se comete un error mandar un status ERROR = 400
    //         return res.status(ERROR).send(resOk(error));
    //     }
    // }
}
