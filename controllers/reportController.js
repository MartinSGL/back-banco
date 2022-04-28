//model required
const account= require('../models').Account
const transaction= require('../models').Transaction
const concept= require('../models').Concept
//resOk asks for two parameters (data and the model name)
//resError asks for two parameters (error and data)
const {resOk,resError} = require('../helpers/responses')
//status number: OK:200, ERROR:400, UNAUTHORIZED:401, VALIDATION:403,NOT_FOUND:404
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status')
const {sequelize} = require('../models');

//mailer helper for messages and responses
const { Op } = require("sequelize");

const modelName = 'Position'

module.exports = {
    async getAccounts(req,res){
        try{
            let date = new Date() 
            let data = await account.count({where:{
                [Op.and]: [
                    sequelize.where(sequelize.fn('date', sequelize.col('createdAt')), '=', date),
                ],
            },
            attributes: ["type"],
            group: "type",
            })



            return res.status(OK).json(resOk(data))
        }catch(error){
            //if there are any error, send status ERROR (400)
            return res.status(ERROR).send(resError(error));
        }
    },
    async getTransactions(req,res){
        try{
            let date = new Date() 
            let data = await transaction.count({where:{
                [Op.and]: [
                    sequelize.where(sequelize.fn('date', sequelize.col('date')), '=', date),
                ],
            },
            include:[{model:concept}],
            attributes: ["ConceptId"],
            group: "ConceptId",
            })
            return res.status(OK).json(resOk(data))
        }catch(error){
            //if there are any error, send status ERROR (400)
            return res.status(ERROR).send(resError(error));
        }
    }
    
}
    