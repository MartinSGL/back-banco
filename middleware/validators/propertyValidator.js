const {check} = require('express-validator')
const {validator} = require('../../helpers/validator')

const validate = [
    
    check('url').not().isEmpty(),
    check('value').not().isEmpty(),
    
    (req,res,next)=>{
        validator(req,res,next)
    }
]

module.exports = {validate}