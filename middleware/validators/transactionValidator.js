const {check} = require('express-validator')
const req = require('express/lib/request')
const {validator} = require('../../helpers/validator')

const validate = [
    check('card_no').not().isEmpty(),
    check('date').not().isDate(),
    check('amount').not().isEmpty().isNumeric(),
    check('concept').not().isEmpty().isNumeric(),
    check('nip').custom(async (value,{req}) => {
        if(req.body.concept===1 && (value===null || /^\s*$/.test(value))){
            return Promise.reject('')
        }
    }),

    (req,res,next)=>{
        validator(req,res,next)
    }
]

module.exports = {validate}