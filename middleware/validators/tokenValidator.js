const {check} = require('express-validator')
const {validator} = require('../../helpers/validator')

const validate = [
    check('tokenf').not().isEmpty(),
    
    (req,res,next)=>{
        validator(req,res,next)
    }
]

module.exports = {validate}