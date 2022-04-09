const executive = require('../models').Executive;
const position = require('../models').Position;
const branch = require('../models').Branch
const {resOk,resError} = require('../helpers/responses')
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status')
const {sequelize} = require('../models');

const modelName = 'Executive';

module.exports = {
    async index(req,res){
        try{
            const data = await executive.findAll({include: [{model: position}]})
            if(data.length === 0){
                return res.status(OK).json(resOk(null))
            }

            return res.status(OK).json(resOk(data))
        }catch(error){
            return res.status(ERROR).send(resError(error))
        }
    },
    async create(req,res){
        try{
            //inicializar la transaccion para inserciones a mas de una tabla
            const transaction = await sequelize.transaction(async (t) => {
                let {name,lastname,userid,password,AreaId,PositionId,date_init,BranchId} = req.body
                let branchF = await branch.findOne({where:{id:BranchId}})
                if(branchF===null) return res.status(NOT_FOUND).json(resOk(null,'Branch'))
                let executiveC = await executive.create({name,lastname,userid,password,AreaId,PositionId},{ transaction: t })
                await executiveC.addBranch(branchF,{through:{date_init: date_init}, transaction: t })
                return res.status(OK).json(resOk(executiveC))   
            })
        }catch(error){
            return res.status(ERROR).send(resError(error))
        }
    },
    async show(req,res){
        try{
            const {id} = req.params;
            const data = await executive.findOne({where: {id}, include: [{model: position}]})
            if(!data){
                return res.status(NOT_FOUND).json(resOk(null,modelName)) 
            }

            res.status(OK).json(resOk({data}));
        }catch(error){
            return res.status(ERROR).send(resError(error))
        }
    },
    async update(req,res){
        try{
            const {id} = req.params;
            let idFound = await executive.findOne({where:{id}})
            if (idFound===null) return res.status(NOT_FOUND).json(resOk(null,modelName)) 
            let [,data] = await executive.update(req.body,{
                where:{id},returning:true,plain:true
            })

            return res.status(OK).json(resOk(data));
        }catch(error){
            return res.status(ERROR).send(resError(error))
        }
    },
    async destroy(req, res){
        let {id} = req.params;
        try{
         let idFound = await executive.findOne({where:{id}})
         if (idFound===null) return res.status(NOT_FOUND).json(resOk(null,modelName)) 
         let data = await executive.destroy({
            where:{id: id},returning:true,plain:true
        });
         return res.status(OK).json(resOk(data));
         }catch(error){
             res.send(ERROR).send(error)
         }
     }
}
