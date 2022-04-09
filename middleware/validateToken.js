const jwt = require('jsonwebtoken')
const responses = require('../helpers/responses')
const {UNAUTHORIZED} = require('../helpers/status')
const {resOk,resError} = require('../helpers/responses')

module.exports = (req,res,next)=>{
    try{
    const authorization = req.get('authorization')
    console.log(authorization)
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
        console.log(token)
    }

    const decodedToken = jwt.verify(token,process.env.FIRMA)
    req.session = {id:decodedToken.session.id}

    return next()

    }catch(error){
        return res.status(UNAUTHORIZED).json(resError(error.message))
    }
}