const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status') //status de los errores
const {resOk,resError} = require('../helpers/responses')
const token = require("../models").Token
const card = require("../models").Card
const account = require("../models").Account
const client = require("../models").Client
const { Op } = require("sequelize")

module.exports = async (req,res,next)=>{
    try{
        let { token_s,card_no,nip } = req.body; // obtener el token destructurado del body enviado por la URL
        let data = await  card.findOne({where:{card_number:card_no,nip:nip},include:[{model:account,include:[{model:client}]}]})
        if(!data) return res.status(NOT_FOUND).json(resError("invalid card number or nip", null));
        
        //comprobar si el token aun esta vigente
        let tokenF = await token.findOne({
          where: {token: token_s, ClientId: data.Account.Client.id, expire_date: { [Op.gt]: new Date() },},
        });
  
        if (tokenF === null) return res.status(UNAUTHORIZED).json(resError("invalid token", null))

        req.account = {
            id_v:data.Account.id,
            amount_v:data.Account.amount,
            type_v:data.Account.type,
            id_card:data.id
        }
        
        return next()

    }catch(error){
        return res.status(ERROR).json(resError(error.message))
    }
}