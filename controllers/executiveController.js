//models required
const executive = require('../models').Executive;
const position = require('../models').Position;
const area = require('../models').Area
const branch = require('../models').Branch
//resOk asks for two parameters (data and the model name)
//resError asks for two parameters (error and data)
const {resOk,resError} = require('../helpers/responses')
//status number: OK:200, ERROR:400, UNAUTHORIZED:401, VALIDATION:403,NOT_FOUND:404
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status')
//sequelize requiered for internal functions and validations
const {sequelize} = require('../models');

const modelName = 'Executive';

module.exports = {
    //all registered executives
    async index(req,res){
        try{
            const data = await executive.findAll({include: [{model:area,include:[{model:position}]}]}) //find all the registres
            //with deletedAt = null
            if(data.length === 0){
                //if there are no registers, return status OK (200), data null and model name
                return res.status(OK).json(resOk(null))
            }
            //if registres are found, registres in json format and status OK (200)
            return res.status(OK).json(resOk(data))
        }catch(error){
            //if there are any error, send status ERROR (400)
            return res.status(ERROR).send(resError(error))
        }
    },
    //create a new executive
    async create(req,res){
        try{
            //create register with parameters from req.body
            //initialize transaction to make an intert in more than one table
            const transaction = await sequelize.transaction(async (t) => {
                let {name,lastname,userid,password,AreaId} = req.body
                let branchF = await branch.findOne({where:{id:1}})
                if(branchF===null) return res.status(NOT_FOUND).json(resOk(null,'Branch'))
                //create register with parameters from req.body
                let executiveC = await executive.create({name,lastname,userid,password,AreaId},{ transaction: t })
                await executiveC.addBranch(branchF,{through:{date_init: Date()}, transaction: t })
                //if register is created, return status OK (200), and data created
                return res.status(OK).json(resOk(executiveC))   
            })
        }catch(error){
            //if there are any error, send status ERROR (400)
            return res.status(ERROR).send(resError(error))
        }
    },
    // find a executive by id
    async show(req,res){
        try{
            //variables needed to find a executive by id
            const {id} = req.params;
            //find the register with the id sent by URL and include the area and position
            const data = await executive.findOne({where: {id}, include: [{model:area,include:[{model:position}]}]})
            if(!data){
                //if there are no registers, return status NOT_FOUND (404), data null and model name
                return res.status(NOT_FOUND).json(resOk(null,modelName)) 
            }
            //if registres are found, registres in json format and status OK (200)
            res.status(OK).json(resOk({data}));
        }catch(error){
            //if there are any error, send status ERROR (400)
            return res.status(ERROR).send(resError(error))
        }
    },
    //update a executive by id
    async update(req,res){
        try{
            //variables needed to find a executive by id
            const {id} = req.params;
            const {name,lastname,userid,AreaId} = req.body
            //find the register with the id sent by URL
            let idFound = await executive.findOne({where:{id}})
            //if there are no registers, return status NOT_FOUND (404), data null and model name
            if (idFound===null) return res.status(NOT_FOUND).json(resOk(null,modelName)) 
            let [,data] = await executive.update({name,lastname,userid,AreaId},{
                where:{id},returning:true,plain:true
            })
            //if registres are found, registres in json format and status OK (200)
            return res.status(OK).json(resOk(data));
        }catch(error){
            //if there are any error, send status ERROR (400)
            return res.status(ERROR).send(resError(error))
        }
    },
    //delete a executive by id
    async destroy(req, res){
        //variables needed to find a executive by id
        let {id} = req.params;
        try{
        //find the register with the id sent by URL
         let idFound = await executive.findOne({where:{id}})
        //if there are no registers, return status NOT_FOUND (404), data null and model name
         if (idFound===null) return res.status(NOT_FOUND).json(resOk(null,modelName)) 
         //if a register is found, delete the register with the id sent by URL
         let data = await executive.destroy({
            where:{id: id},returning:true,plain:true
        });
        //if the register were deleted succesfully, return data in json format and status OK (200)
         return res.status(OK).json(resOk(data));
         }catch(error){
            //if there are any error, send status ERROR (400)
             res.send(ERROR).send(error)
         }
     }
}
