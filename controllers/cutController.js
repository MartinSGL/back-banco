const cut = require('../models').Cut;
const cashbox = require('../models').Cashbox;
const denomination = require('../models').Denomination;
const transaction = require('../models').Transaction;
const card = require('../models').Card;
const account = require('../models').Account;
const {sequelize} = require('../models');
const {resOk,resError} = require('../helpers/responses')
//revisar el helper para ver el numero de estatus
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status')
const { Op } = require("sequelize");

const modelName = 'Cut'

//valida que el total enviado coninsida con las denominaciones
const validate = async (denominations,total_cut)=>{
    let total = 0;
    let denominationF = await denomination.findAll({})
    denominationF.forEach((el,index) => {
        total += denominations[el.id]*el.value
    });
    total_cut = parseFloat(total_cut)
    total = parseFloat(total)
    console.log(total_cut,total)
    if(total!==total_cut) return false
    return true
}

module.exports = {
    async index(req,res){
        try{
            const data = await cut.findAll({include:[{model:cashbox},{
                model:denomination, through:{attributes:['amount']}
            }]})
            if(data.length === 0){
                return res.status(OK).json(resOk(null))
            }
            return res.status(OK).json(resOk(data))
        }catch(error){
            return res.status(ERROR).send(resError(error))
        }
    },
    async create(req, res){
        try{
            // datos para cortes
            let {total_cut,type,CashboxId} = req.body
            let date = new Date()
            let ExecutiveId = req.session.id
            //m10c,m50c,m1p,m2p,m5p,m10p,m20p,b20p,b50p,b100p,b200p,b500p,b1000p ids de denominaciones
            let denominations = req.body.denominations
            console.log(req.body)
            //validar que el total coincida con las denominaciones
            let total_denomination = await validate(denominations,total_cut)
            if(!total_denomination)  return res.status(VALIDATION).json(resError("denominations doesn't not match with total")) 

            //iniciar transaccion
            const result = await sequelize.transaction(async (t) => {
                //guardar los datos en la tabla pivote de cortes
                let cutC = await cut.create({total_cut,date,type,CashboxId,ExecutiveId},{ transaction: t })
                for (const key in denominations) {
                    if(denominations[key]!==0 || denominations[key]!=='') 
                    await cutC.addDenomination(key,{through:{amount: denominations[key]},transaction: t})                    
                }     

                return res.status(OK).json(resOk(cutC))
            })
          
            
        }catch(error){
            return res.status(ERROR).send(error)
            
        }
    },
    async show(req, res){
        try{
            //find cut by id
            const {id} = req.params
            const cutF = await cut.findOne({include:[{model:denomination}],where:{id}})
            if (cutF===null) return res.status(NOT_FOUND).json(resOk(null,modelName))
            return res.status(OK).json(resOk(cutF))
            
        }catch(error){
            return res.status(ERROR).send(resError(error))
        }
    },
    async update(req, res){
        try{
            //id
            let {id} = req.params
            // datos para cortes
            let {total_cut,type,CashboxId} = req.body
            let date = new Date()
            //obtener el id del toekn
            let ExecutiveId = req.session.id
            //m10c,m50c,m1p,m2p,m5p,m10p,m20p,b20p,b50p,b100p,b200p,b500p,b1000p ids de denominaciones
            let denominations = req.body.denominations
            //validar que exista el corte
            let idFound = await cut.findOne({where:{id}})
            if (idFound===null) return res.status(NOT_FOUND).json(resOk(null,modelName))
            //validar que el total coincida con las denominaciones
            let total_denomination = await validate(denominations,total_cut)
            if(!total_denomination)  return res.status(VALIDATION).json(resError("denominations doesn't not match with total")) 


            // //iniciar transaccion
            const result = await sequelize.transaction(async (t) => {
                //guardar los reusltados
                let [,cutU] = await cut.update({total_cut,date,type,CashboxId,ExecutiveId},
                    {
                        where:{id},returning:true,plain:true
                    },
                    { transaction: t })
                    
                //borrar registros anterirores
                let deleteC = await cutU.setDenominations([],{ransaction: t}) 
                //guardar los datos en la tabla pivote de cortes
                for (const key in denominations) {
                    if(denominations[key]!==0 || denominations[key]!=='') 
                    await cutU.addDenomination(key,{through:{amount: denominations[key]},transaction: t})                    
                }   

                return res.status(OK).json(resOk(cutU))
            })
          
            
        }catch(error){
            return res.status(ERROR).send(resError(error))
        }
    },
    async destroy(req, res){
        try{
            //id
            let {id} = req.params
            //validar que exista el corte
            let idFound = await cut.findOne({where:{id}})
            if (idFound===null) return res.status(NOT_FOUND).json(resOk(null,modelName)) 
            
            //guardar los datos en la tabla pivote de cortes
            let cutD = await cut.destroy({where:{id: id},returning:true,plain:true})                

            return res.status(OK).json(resOk(cutD))
        
        }catch(error){
            return res.status(ERROR).send(resError(error))
        }
    },
    async getCutInfoByExecutive(req,res){
        try {
            let id = 2 // {id} = req.session
            let date = new Date()

            let total_system = 0 

            //obtener el total por corte inicial
            let cutTotal = await cut.findOne({where:{
                    ExecutiveId:2,
                    type:"initial",
                    [Op.and]: [
                        sequelize.where(sequelize.fn('date', sequelize.col('date')), '=', date),
                    ]
                }
            })

            if(!cutTotal) return res.status(OK).json(resOk(total_system))
            
            //sumar el total por corte inicial
            total_system += cutTotal.total_cut

            //obtener el total para las transacciones
            let total_transactions = await transaction.findAll({
                attributes:['date','ConceptId','amount'],where:{ExecutiveId:2},
                [Op.and]: [
                    sequelize.where(sequelize.fn('date', sequelize.col('date')), '=', date),
                ],
                include:[{model:card,include:[{model:account,attributes:['type']}]}]

            })

            //obtener sumar el total por transacciones
            for (const el of total_transactions) {
                if(el.ConceptId===1){
                    total_system -= el.amount  
                }else if(el.ConceptId===2 || el.ConceptId===3){
                    total_system += el.amount
                }else{
                    if(el.Card.Account.type==='debit'){
                        total_system += el.amount
                    }else{
                        total_system -= el.amount
                    }
                }
            }

            return res.status(OK).json(resOk(total_system))
        } catch (error) {
            return res.status(ERROR).send(resError(error))
        }
    }
}