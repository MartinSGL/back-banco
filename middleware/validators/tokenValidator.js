const {check} = require('express-validator')
const {validator} = require('../../helpers/validator')

const validate = [
    check('id').not().isEmpty().isNumeric(),
    
    (req,res,next)=>{
        validator(req,res,next)
    }
]

module.exports = {validate}