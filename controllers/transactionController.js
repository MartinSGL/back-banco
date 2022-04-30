//models required
const transaction = require('../models').Transaction
const card = require('../models').Card
const account = require('../models').Account
const commission = require('../models').Commission
const creditdetail = require('../models').Creditdetail
const mortgage = require('../models').Mortgage
const interest = require('../models').Interest
const conceptModel = require('../models').Concept
const client = require('../models').Client
const executive = require('../models').Executive

//resOk asks for two parameters (data and the model name)
//resError asks for two parameters (error and data)
const cut = require('../models').Cut

const {resOk,resError} = require('../helpers/responses')
//status number: OK:200, ERROR:400, UNAUTHORIZED:401, VALIDATION:403,NOT_FOUND:404
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status')
//sequelize for made internal queries
const {sequelize} = require('../models');

//mailer helper for messages and responses
const { Op } = require("sequelize");
const mailer = require('../helpers/mailer')



const modelName = 'Transaction'

module.exports = {
    //all registered transactions
    async index(req,res){
        try{
            let {search,page} = req.params
            let offset = (page-1)*5
            //find all the registres with deletedAt = null (include all the relations)
            let data = null
            if(search!=="inicial"){
                data = await transaction.findAll({
                    attributes:['id','amount','date'],include:[
                        {model:conceptModel,attributes:['name']},
                        {model:executive,attributes:['name','lastname']},
                        {model:card,attributes:['card_number'],include:[
                            {model:account,attributes:['no_acc','type'], 
                            where:{
                            no_acc: {
                            [Op.like]: `%${search}%`,
                        },
                        }
                        }
                        ]}],
                        offset,
                        limit:5,
                    },{required: true})
            }else{
                data = await transaction.findAll({
                    attributes:['id','amount','date'],include:[
                        {model:conceptModel,attributes:['name']},
                        {model:executive,attributes:['name','lastname']},
                        {model:card,attributes:['card_number'],include:[
                            {model:account,attributes:['no_acc','type'],
                        }
                        ]}],
                        offset,
                        limit:5,
                    },{required: true})
            }
            //if there are any registers, return status OK (200), data null
            if(data===null) return res.status(OK).json(resOk(null)) 
            //if registres are found, registres in json format and status OK (200)
            return res.status(OK).json(resOk(data))
        }catch(error){
            //if there are any error, send status ERROR (400)
            return res.status(ERROR).send(resError(error));
        }
    },
    //create a new transaction
    async create(req,res){
        try{
            //create register with the parameters from req.body
            let {card_no,nip,amount,concept } = req.body;
            let date = new Date() 
            let data, message='';
            //find the card with the card_no sent in req.body inclueding the account and client
            if(concept===1){
                data = await  card.findOne({where:{card_number:card_no,nip:nip},include:[{model:account,include:[{model:client}]}]})
                //if the card or nip is not found, return invalid card
                message = 'invalid card number or nip'
            }else{
                data = await  card.findOne({where:{card_number:card_no},include:[{model:account,include:[{model:client}]}]})
                message = 'invalid card number'
            }
            //if the card is not found, return status NOT_FOUND (404)
            if(!data) return res.status(NOT_FOUND).json(resError(message));
            let id_v = data.Account.id, amount_v=data.Account.amount,type_v=data.Account.type, id_card=data.id
            
            //commission for the transaction with the id requested from the session
            const {id} = req.session
            let commissionF = await commission.findOne({})
            let conceptF = await conceptModel.findOne({where:{id:concept}})

            //send an email to the client with the transaction details
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

            //validar si ya se abrio caja
            // let onlyDate= date.toLocaleDateString() 
            let cashbox_validate = await cut.findOne({where:{
                ExecutiveId:id,
                [Op.and]: [
                    sequelize.where(sequelize.fn('date', sequelize.col('date')), '=', date),
                ],
                type:'initial'
            }})
            if(!cashbox_validate) return res.status(UNAUTHORIZED).send(resError('there must be an opening cut before transactions'))
            
            //validate if a transaction type opening exists
            let transaction_opening = await transaction.findOne({where:{CardId:data.id,ConceptId:4}})

            //validar que el modulo pueda ser divido entre .10 centavos
            if(amount < 0) return res.status(UNAUTHORIZED).send(resError('invalid transactions, the amount must be positive'))
            //validar que el modulo pueda ser divido entre .10 centavos
            let amountStr = amount.toString().split(".")[1] || 1
            console.log(amountStr.lenght)
            
            if(amountStr.length>1) return res.status(UNAUTHORIZED).send(resError('invalid transactions, our minimun denominations is 10 cents'))
            
            amount = parseFloat(amount)

            //if the transaction type opening is not found, return status UNAUTHORIZED (401)
            if(concept===1){
                if(!transaction_opening)  return res.status(UNAUTHORIZED).send(resError('it must be an opening transaction first'))
                if(type_v!=='debit') return res.status(UNAUTHORIZED).json(resError('Invalid type of account, it must be a debit'))
                let amount_withdraw = amount + amount*commissionF.amount, 
                amount_final = amount_v - amount_withdraw
                //valida if the solicitated amount is greater than the amount of the account
                if(amount_withdraw > amount_v) return res.status(UNAUTHORIZED).json(resError('insuficient funds'))
                //initialize the transaction
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
                    //if the transaction is created, return status OK (200) and the transaction information
                    return res.status(OK).json(resOk(withdraw))
                })
                //if concept is 2, and the transaction type opening is found, return status UNAUTHORIZED (401)
            }else if(concept===2){
                if(!transaction_opening)  return res.status(UNAUTHORIZED).send(resError('it must be an opening transaction first'))
                //if the type of account is not debit, return status UNAUTHORIZED (401)
                if(type_v!=='debit') return res.status(UNAUTHORIZED).json(resError('Invalid type of account, it must be a debit'))
                let amount_deposit = amount - amount*commissionF.amount,
                    amount_final = amount_v + amount_deposit

                //initialize the transaction
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
                //if concept is 3, and the transaction type opening is found, return status UNAUTHORIZED (401)
                if(!transaction_opening)  return res.status(UNAUTHORIZED).send(resError('it must be an opnening transaction first'))
                //if the type of account is not credit or matgage return status UNAUTHORIZED (401)
                if(!(type_v==='credit' || type_v==='mortgage')) return res.status(UNAUTHORIZED).json(resError('Invalid type of account, it must be a credit or mortgage'))
                let interests = 0
                //if the type of account is credit, calculate the interest
                if(type_v==='credit'){
                    let accountF = await account.findOne({include:[{model:creditdetail}],where:{id:id_v}})
                    interests = accountF.Creditdetails[0].interest
                }else{
                    //if the type of account is mortgage, calculate the interest
                    let accountF = await account.findOne({include:[{model:mortgage,include:[{model:interest}]}],where:{id:id_v}})
                    interests = accountF.Mortgage.Interest.interest
                }
                //calculate the amount of the transaction
                let amount_commission = amount*commissionF.amount,
                    amount_interest = amount*interests, 
                    amount_final = amount_v - (amount - (amount_commission + amount_interest))
                //initialize the transaction
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
                //if concept is 4, and the transaction type opening is found, return status UNAUTHORIZED (401)
                if(transaction_opening)  return res.status(UNAUTHORIZED).send(resError('there is a opnening transaction already'))
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
                    //if the transaction is created, return status OK (200) and the transaction information
                    return res.status(OK).json(resOk(transaccion))
            }
        }catch(error){
            //if there are any error, send status ERROR (400)
            return res.status(ERROR).send(resError(error))
        }
    },
    //get account by card
    async searchByCard(req,res){
        try{
            //if the card is found, return the account information
             let {card_s} = req.params
            data = await card.findOne({where:{card_number:card_s},
                attributes:['card_number'],include:[{model:account, attributes:['no_acc','type'], include:[{model:client, attributes:['name','lastname','curp']}]}]
            })
            //if found, registres in json format and status OK (200)
            return res.status(OK).json(resOk(data))
        }catch(error){
            //if there are any error, send status ERROR (400)
            return res.status(ERROR).send(resError(error))
        }
       
    }
}