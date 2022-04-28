//models required
const executive = require('../models').Executive
const position = require('../models').Position
const area = require('../models').Area
//package required to encrypt the password
const bcrypt = require('bcrypt')
//package required for the token
const jwt = require('jsonwebtoken')
//resOk asks for two parameters (data and the model name)
//resError asks for two parameters (error and data)
//resLogin for success or error responses
const {resOk,resError,resLoing} = require('../helpers/responses') 
//status number: OK:200, ERROR:400, UNAUTHORIZED:401, VALIDATION:403,NOT_FOUND:404
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status') 


const nameModel = 'executive'

module.exports = {
    //function to login
    async login(req,res){
        try{
            //variables to store the data sent in the request
            const {userid,password}= req.body
            //find the user in the database and include the position
            let executiveF = await executive.findOne({where: {userid}, include: [{model:area,include:[{model:position}]}]})
            //if the user is not found, return status OK (200), data null and model name
            if(!executiveF) return res.status(OK).json(resOk(null,nameModel))
            //variables to encrypt the password
            let ePass = executiveF.password
            //compare the password sent in the request with the encrypted password in the database
            let permision = await bcrypt.compare(password,ePass)
            //if permision is true, give the payload to the token
            if(permision===true) {
                const name = `${executiveF.name} ${executiveF.lastname}`
                const payload = {session:{ id:executiveF.id,name,rol:executiveF.Area.Position.name}}
                //create the token with the payload and expiration time
                let token = jwt.sign(payload,process.env.FIRMA,{expiresIn: "8h"})
                //return status OK (200), and the response with the token
                return res.status(OK).json(resLoing(token))
            }
            //return status OK (200), data null and model name
            return res.status(OK).send(resOk(null,nameModel))
        }catch(err){
            //if there are any error, send status ERROR (400)
            return res.status(ERROR).send(resError(err,null));
        }
        
    },
}