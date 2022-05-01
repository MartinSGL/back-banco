//model required
const cashbox= require('../models').Cashbox
const cut= require('../models').Cut
//resOk asks for two parameters (data and the model name)
//resError asks for two parameters (error and data)
const {resOk,resError} = require('../helpers/responses')
//status number: OK:200, ERROR:400, UNAUTHORIZED:401, VALIDATION:403,NOT_FOUND:404
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status')
//sequelize for made internal queries
const {sequelize} = require('../models');
//mailer helper for messages and responses
const { Op } = require("sequelize");

const modelName = 'Cashbox'

module.exports = {
    //all registered cashboxes
    async initial(req,res){
        let date = new Date()
        try{
            let data = await cashbox.findAll({
                include:[{model:cut,
                    required: false,
                    where:{
                        [Op.and]: [
                            sequelize.where(
                            sequelize.fn("date", sequelize.col("date")),
                            "=",
                            date
                            ),
                        ],
                        type:"initial"
                    }
                }],
            }) //find all the registres with deletedAt = null
            //if there are any registers, return status OK (200), data null and model name
            if(data===null) return res.status(OK).json(resOk(null)) 
            //if registres are found, registres in json format and status OK (200)
            return res.status(OK).json(resOk(data))
        }catch(error){
            //if there are any error, send status ERROR (400)
            return res.status(ERROR).send(resError(error));
        }
    },
    //all registered cashboxes
    async final(req,res){
        let date = new Date()
        try{
            let data = await cashbox.findAll({
                include:[{model:cut,
                    required: false,
                    where:{
                        [Op.and]: [
                            sequelize.where(
                            sequelize.fn("date", sequelize.col("date")),
                            "=",
                            date
                            ),
                        ],
                        type:"final"
                    }
                }],
                
            }) //find all the registres with deletedAt = null
            //if there are any registers, return status OK (200), data null and model name
            if(data===null) return res.status(OK).json(resOk(null)) 
            //if registres are found, registres in json format and status OK (200)
            return res.status(OK).json(resOk(data))
        }catch(error){
            //if there are any error, send status ERROR (400)
            return res.status(ERROR).send(resError(error));
        }
    }
}