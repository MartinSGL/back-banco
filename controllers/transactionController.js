//modelo requerido
const transaction = require('../models').Transaction
const card = require('../models').Card
const account = require('../models').Account
const commission = require('../models').Commission
const creditdetail = require('../models').Creditdetail
const mortgage = require('../models').Mortgage
const interest = require('../models').Interest
const concept = require('../models').Concept
//resOk pide dos parametros (data y nombre del modelo)
//resError pide dos parametros (error y data)
const {resOk,resError} = require('../helpers/responses')
//revisar el helper para ver el numero de estatus
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status')
const {sequelize} = require('../models');

const modelName = 'Transaction'

module.exports = {
    async index(req,res){
        console.log('entro a index')
        try{
            let data = await transaction.findAll({
                attributes:['id','amount'],include:[
                    {model:concept,attributes:['name']},
                    {model:card,attributes:['card_number'],include:[
                        {model:account,attributes:['no_acc','amount']}
                    ]}]}) //buscar todos los registros con deletedAt = null
            //si no encuentra ningun registro regresar un estatus OK (200), data en null y nombre del modelo
            if(data===null) return res.status(OK).json(resOk(null)) 
            //si si encuentra registros mandardar los registros en un json
            return res.status(OK).json(resOk(data))
        }catch(error){
            return res.status(ERROR).send(resError(error));
        }
    },
    async create(req,res){
        console.log('entro a create')
        try{
            const {card_no,nip,amount,concept} = req.body
            const {id_v,no_acc_v,amount_v,type_v,id_card} = req.account
            const {id} = req.session
            let commissionF = await commission.findOne({})
            
            if(concept===1){
                if(type_v!=='debit') return res.status(UNAUTHORIZED).json(resError('Invalid type of account'))
                let amount_withdraw = amount + amount*commissionF.amount, 
                amount_final = amount_v - amount_withdraw
                //validar si se tiene el dinero necesario para retirar
                console.log(amount_withdraw)
                if(amount_withdraw > amount_v) return res.status(UNAUTHORIZED).json(resError('Invalid amount'))
                //iniciar transaccion
                await sequelize.transaction(async (t) => {
                    let transaccion = await transaction.create(
                        {
                            amount,
                            CommissionId:commissionF.id,
                            ConceptId:concept,
                            ExecutiveId:id,
                            CardId:id_card,
                        },
                        {transaction:t})
                    let [,withdraw] = await account.update({amount:amount_final},
                        {where:{id:id_v},returning:true,plain:true},
                        {transaction:t})
                    return res.status(OK).json(resOk(withdraw))
                })
            }else if(concept===2){
                if(type_v!=='debit') return res.status(UNAUTHORIZED).json(resError('Invalid type of account'))
                let amount_deposit = amount - amount*commissionF.amount,
                    amount_final = amount_v + amount_deposit

                //iniciar transaccion
                await sequelize.transaction(async (t) => {
                    let transaccion = await transaction.create(
                        {
                            amount,
                            CommissionId:commissionF.id,
                            ConceptId:concept,
                            ExecutiveId:id,
                            CardId:id_card,
                        },
                        {transaction:t})
                    let [,deposit] = await account.update({amount:amount_final},
                        {where:{id:id_v},returning:true,plain:true})
                    return res.status(OK).json(resOk(deposit))
                })
                    
                
            }else if(concept===3){
                if(!(type_v==='credit' || type_v==='mortgage')) return res.status(UNAUTHORIZED).json(resError('Invalid type of account'))
                let interests = 0
                if(type_v==='credit'){
                    let accountF = await account.findOne({include:[{model:creditdetail}],where:{id:id_v}})
                    interests = accountF.Creditdetail.interest
                }else{
                    let accountF = await account.findOne({include:[{model:mortgage,include:[{model:interest}]}],where:{id:id_v}})
                    interests = accountF.Mortgage.Interest.interest
                }
                let amount_commission = amount*commissionF.amount,
                    amount_interest = amount*interests, 
                    amount_final = amount_v - (amount - (amount_commission + amount_interest))
                    console.log(amount,amount_commission,amount_interest,amount_final)
                //iniciar transaccion
                await sequelize.transaction(async (t) => {
                    let transaccion = await transaction.create(
                        {
                            amount,
                            CommissionId:commissionF.id,
                            ConceptId:concept,
                            ExecutiveId:id,
                            CardId:id_card,
                        },
                        {transaction:t})
                    let [,payment] = await account.update({amount:amount_final},
                        {where:{id:id_v},returning:true,plain:true})
                        return res.status(OK).json(resOk(payment))
                })
                
            }else{
                return res.status(VALIDATION).json(resError('invalid type of transaction'))
            }
        }catch(error){
            return res.status(ERROR).send(resError(error))
        }
    }
}