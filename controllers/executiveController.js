const executive = require('../models').Executive;
const position = require('../models').Position;
const {resOk,resError} = require('../helpers/responses')
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status')

const modelName = 'Executive';

module.exports = {
    async create(req,res){
        try{
            const data = await executive.create(req.body)
            return res.status(OK).json(resOk(data));
        }catch(error){
            return res.status(ERROR).send(resError(error))
        }
    },
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
             res.send(400).send(error)
         }
     }
}
