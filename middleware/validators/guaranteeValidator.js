const {check} = require('express-validator')
const {validator} = require('../../helpers/validator')

const validate = [
    check('name').not().isEmpty(),
    check('lastname').not().isEmpty(),
    check('address').not().isEmpty(),
    check('telephone').not().isEmpty().isNumeric().isLength({min: 10, max: 10}),
    check('MortgageId').not().isEmpty(),
    
    (req,res,next)=>{
        validator(req,res,next)
    }
]

module.exports = {validate}