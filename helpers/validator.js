const {validationResult} = require('express-validator')
const {resError} = require('./responses')
const {OK,ERROR,UNAUTHORIZED,VALIDATION,NOT_FOUND} = require('../helpers/status')

const validator = (req,res,next) =>{
    try{
        validationResult(req).throw()
        return next()
    }catch(error){
        let new_error = [{title:'Validation error'},...error.array()]
        res.status(VALIDATION).json(resError(new_error))
    }
}

module.exports = {validator}