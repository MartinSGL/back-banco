const {check} = require('express-validator')
const {validator} = require('../../helpers/validator')

const validate = [
    check('token_s').not().isEmpty(),
    check('card_no').not().isEmpty(),
    check('nip').not().isEmpty(),
    check('amount').not().isEmpty().isNumeric(),
    check('concept').not().isEmpty().isNumeric(),
    
    (req,res,next)=>{
        validator(req,res,next)
    }
]

module.exports = {validate}