const executive = require('../models').Executive
const position = require('../models').Position
const area = require('../models').Area
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {resOk,resError,resLoing} = require('../helpers/responses') //respuestas para mensajes exitosos y de errores
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status') //status de los errores

//nombre del modelo para el mensaje enviado
const nameModel = 'executive'

module.exports = {
    async login(req,res){
        try{
            const {userid,password}= req.body
            
            let executiveF = await executive.findOne({where: {userid}, include: [{model:area,include:[{model:position}]}]})
            if(!executiveF) return res.status(OK).json(resOk(null,nameModel))
            let ePass = executiveF.password
            let permision = await bcrypt.compare(password,ePass)
            if(permision===true) {
                //agregar información al token
                const name = `${executiveF.name} ${executiveF.lastname}`
                const payload = {session:{ id:executiveF.id,name,rol:executiveF.Area.Position.name}}
                let token = jwt.sign(payload,process.env.FIRMA,{expiresIn: "8h"})
                return res.status(OK).json(resLoing(token))
            }
            return res.status(OK).send(resOk(null,nameModel))
        }catch(err){
            return res.status(ERROR).send(resError(err,null));
        }
        
    },
}