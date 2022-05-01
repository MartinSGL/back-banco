const jwt = require('jsonwebtoken')
const responses = require('../helpers/responses')
const {UNAUTHORIZED} = require('../helpers/status')
const {resOk,resError} = require('../helpers/responses')

module.exports = (req,res,next)=>{
    try{
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }

    const decodedToken = jwt.verify(token,process.env.FIRMA)
    req.session = {id:decodedToken.session.id,name:decodedToken.session.name,rol:decodedToken.session.rol}

    return next()

    }catch(error){
        return res.status(500).json(resError(error.message))
    }
}