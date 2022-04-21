//modelo requerido
const beneficiary= require('../models').Beneficiary;
//resOk pide dos parametros (data y nombre del modelo)
//resError pide dos parametros (error y data)
const {resOk,resError} = require('../helpers/responses')
//revisar el helper para ver el numero de estatus
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status')

const modelName = 'Beneficiary'

module.exports = {
    
    async create(req,res){
        try{
            const beneficiary = await beneficiary.create(req.body);
            resOk(res,OK,modelName,beneficiary)
        }catch(error){
            resError(res,ERROR,modelName,error)
        }
    },
    
    async update(req,res){
        try{
            const beneficiary = await beneficiary.update(req.body,{
                where:{
                    id:req.params.id
                }
            });
            resOk(res,OK,modelName,beneficiary)
        }catch(error){
            resError(res,ERROR,modelName,error)
        }
    },
    //delete a beneficiary logicly (update deletedAt)
    async delete(req,res){
        try{
            const beneficiary = await beneficiary.update({
                deletedAt:new Date()
            },{
                where:{
                    id:req.params.id
                }
            });
            resOk(res,OK,modelName,beneficiary)
        }catch(error){
            resError(res,ERROR,modelName,error)
        }
    },
    //get a beneficiary by id
    //exclude deletedAt and createdAt fields
    async getById(req,res){
        try{
            const beneficiary = await beneficiary.findOne({
                where:{
                    id:req.params.id
                },
                attributes: {
                    exclude: ['createdAt','deletedAt']
                }
            });
            resOk(res,OK,modelName,beneficiary)
        }catch(error){
            resError(res,ERROR,modelName,error)
        }
    },
}    
