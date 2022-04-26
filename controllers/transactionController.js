//modelos requerido
const transaction = require('../models').Transaction
const card = require('../models').Card
const account = require('../models').Account
const commission = require('../models').Commission
const creditdetail = require('../models').Creditdetail
const mortgage = require('../models').Mortgage
const interest = require('../models').Interest
const conceptModel = require('../models').Concept
const client = require('../models').Client
//resOk pide dos parametros (data y nombre del modelo)
//resError pide dos parametros (error y data)
const {resOk,resError} = require('../helpers/responses')
//revisar el helper para ver el numero de estatus
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status')
const {sequelize} = require('../models');
//helper mailer
const mailer = require('../helpers/mailer')

const modelName = 'Transaction'

module.exports = {
    async index(req,res){
        try{
            let data = await transaction.findAll({
                attributes:['id','amount','date'],include:[
                    {model:conceptModel,attributes:['name']},
                    {model:card,attributes:['card_number'],include:[
                        {model:account,attributes:['no_acc','type']}
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
        try{
            
            let {card_no,nip,amount,concept,date } = req.body; 
            let data, message='';

            if(concept===1){
                data = await  card.findOne({where:{card_number:card_no,nip:nip},include:[{model:account,include:[{model:client}]}]})
                message = 'invalid card number or nip'
            }else{
                data = await  card.findOne({where:{card_number:card_no},include:[{model:account,include:[{model:client}]}]})
                message = 'invalid card number'
            }
            
            if(!data) return res.status(NOT_FOUND).json(resError(message, null));
            let id_v = data.Account.id, amount_v=data.Account.amount,type_v=data.Account.type, id_card=data.id
           
            const {id} = req.session
            let commissionF = await commission.findOne({})
            let conceptF = await conceptModel.findOne({where:{id:concept}})

            let textMail = 
            "Hi " + data.Account.Client.name +" "+data.Account.Client.lastname +"."+
            " A transactions was made from your account \n" +
            "\n" +
            "account number: " + data.Account.no_acc +"\n" +
            "card number: " + data.card_number + "\n" +
            "type of transaction: " + conceptF.name + "\n" +
            "ammount: " + amount + "\n" +
            "If this is a mistake, please contact us"

            let mailerOptions = {
                emailC: data.Account.Client.email,
                subjectC: "Transactions Informations",
                textC: textMail
            }
               
            if(concept===1){
                if(type_v!=='debit') return res.status(UNAUTHORIZED).json(resError('Invalid type of account'))
                let amount_withdraw = amount + amount*commissionF.amount, 
                amount_final = amount_v - amount_withdraw
                //validar si se tiene el dinero necesario para retirar
                if(amount_withdraw > amount_v) return res.status(UNAUTHORIZED).json(resError('Invalid amount'))
                //iniciar transaccion
                await sequelize.transaction(async (t) => {
                    let transaccion = await transaction.create(
                        {
                            amount,
                            date,
                            CommissionId:commissionF.id,
                            ConceptId:concept,
                            ExecutiveId:id,
                            CardId:id_card,
                        },
                        {transaction:t})
                    let [,withdraw] = await account.update({amount:amount_final},
                        {where:{id:id_v},returning:true,plain:true},
                        {transaction:t})
                    
                    if(withdraw){
                        mailer(mailerOptions)
                    }
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
                            date,
                            CommissionId:commissionF.id,
                            ConceptId:concept,
                            ExecutiveId:id,
                            CardId:id_card,
                        },
                        {transaction:t})
                    let [,deposit] = await account.update({amount:amount_final},
                        {where:{id:id_v},returning:true,plain:true})

                    if(deposit){
                        mailer(mailerOptions)
                    }
                    return res.status(OK).json(resOk(deposit))
                })      

            }else if(concept===3){
                if(!(type_v==='credit' || type_v==='mortgage')) return res.status(UNAUTHORIZED).json(resError('Invalid type of account'))
                let interests = 0
                if(type_v==='credit'){
                    let accountF = await account.findOne({include:[{model:creditdetail}],where:{id:id_v}})
                    interests = accountF.Creditdetails[0].interest
                }else{
                    let accountF = await account.findOne({include:[{model:mortgage,include:[{model:interest}]}],where:{id:id_v}})
                    interests = accountF.Mortgage.Interest.interet
                }
                let amount_commission = amount*commissionF.amount,
                    amount_interest = amount*interests, 
                    amount_final = amount_v - (amount - (amount_commission + amount_interest))
                //iniciar transaccion
                await sequelize.transaction(async (t) => {
                    let transaccion = await transaction.create(
                        {
                            amount,
                            date,
                            CommissionId:commissionF.id,
                            ConceptId:concept,
                            ExecutiveId:id,
                            CardId:id_card,
                        },
                        {transaction:t})
                    let [,payment] = await account.update({amount:amount_final},
                        {where:{id:id_v},returning:true,plain:true})
                        
                        if(payment){
                            mailer(mailerOptions)
                        }
                        return res.status(OK).json(resOk(payment))
                })
                
            }else if(concept===4){
                let transactionMade = await transaction.findAll({where:{CardId:data.id}})
                if(transactionMade.length>0)  return res.status(VALIDATION).send(resError('invalid transaction'))
                let transaccion = await transaction.create(
                    {
                        amount,
                        date,
                        CommissionId:commissionF.id,
                        ConceptId:concept,
                        ExecutiveId:id,
                        CardId:id_card,
                    })

                    if(transaccion){
                        mailer(mailerOptions)
                    }
                    return res.status(OK).json(resOk(transaccion))
            }
        }catch(error){
            return res.status(ERROR).send(resError(error))
        }
    },
    async searchByCard(req,res){
        try{
             let {card_s} = req.params
            data = await card.findOne({where:{card_number:card_s},
                attributes:['card_number'],include:[{model:account, attributes:['no_acc'], include:[{model:client, attributes:['name','lastname','curp']}]}]
            })

            return res.status(OK).json(resOk(data))
        }catch(error){
            return res.status(ERROR).send(resError(error))
        }
       
    }
}