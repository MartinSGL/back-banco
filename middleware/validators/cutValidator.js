const {check} = require('express-validator')
const {validator} = require('../../helpers/validator')

const validate = [
    check('total_cut').not().isEmpty().isNumeric(),
    check('type').not().isEmpty(),
    check('CashboxId').not().isEmpty().isNumeric(),

    (req,res,next)=>{
        validator(req,res,next)
    }
]

module.exports = {validate}