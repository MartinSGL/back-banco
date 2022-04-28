//models required
const area= require('../models').Area
const position= require('../models').Position
//resOk asks for two parameters (data and the model name)
//resError asks for two parameters (error and data)
const {resOk,resError} = require('../helpers/responses')
//status number: OK:200, ERROR:400, UNAUTHORIZED:401, VALIDATION:403,NOT_FOUND:404
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status')

const modelName = 'Area'

module.exports = {
    //all registered areas
    async index(req,res){
        try{
            let data = await area.findAll({include:[{model:position}]}) //find all the registres with deletedAt = null
            //if there are any registers, return status OK (200), data null and model name
            if(data===null) return res.status(OK).json(resOk(null)) 
            //if registres are found, registres in json format and status OK (200)
            return res.status(OK).json(resOk(data))
        }catch(error){
            //if there are any error, send status ERROR (400)
            return res.status(ERROR).send(resError(error));
        }
    },
    //create a new area
    async create(req,res){
        try{
            //create register with the parameters from req.body
            let data = await area.create(req.body);
            //if register is created, return status OK (200), and data created
            return res.status(OK).json(resOk(data));
        }catch(err){
            //if there are any error, send status ERROR (400)
            return res.status(ERROR).send(resError(error));
        }
    },
    //update an area
    async update(req,res){
        try{
            let {id} = req.params // get the id from the parameter sent by URL
            let idFound = await area.findOne({where:{id}}) //prove if the id exists in the database
            //return error NOT_FOUND (404) in case the id is not found
            if (idFound===null) return res.status(NOT_FOUND).json(resOk(null,modelName)) 
            //update with the parameters sent in req.body
            let [,data] = await area.update(req.body,{
                where:{id},returning:true,plain:true
            })
            //return status OK (200) and data updated
            return res.status(OK).json(resOk(data));
        }catch(error){
            //if there are any error, send status ERROR (400)
            return res.status(ERROR).json(resError(error));
        }
    },
    //delete an area
    async destroy(req,res){
        try{
            let {id} = req.params // get the id from the parameter sent by URL
            let idFound = await area.findOne({where:{id}}) //prove if the id exists in the database
            //return error NOT_FOUND (404) in case the id is not found
            if (idFound===null) return res.status(NOT_FOUND).json(resOk(null,modelName)) 
            //delete the register with the id sent by URL
            let data = await area.destroy({
                where:{id: id},returning:true,plain:true
            });
            //return status OK (200) and data deleted
            return res.status(OK).json(resOk(data));
        }catch(error){
            //if there is any error, send status ERROR (400)
            return res.status(ERROR).send(resOk(error));
        }
    }
}
    
