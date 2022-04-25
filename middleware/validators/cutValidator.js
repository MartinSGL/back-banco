const {check} = require('express-validator')
const {validator} = require('../../helpers/validator')

const validate = [
    check('total_cut').not().isEmpty().isNumeric(),
    check('total_system').not().isEmpty().isNumeric(),
    check('type').not().isEmpty(),
    check('CashboxId').not().isEmpty().isNumeric(),
    check("denominations.m10c").not().isEmpty().isNumeric(),
    check("denominations.m50c").not().isEmpty().isNumeric(),
    check("denominations.m1p").not().isEmpty().isNumeric(),
    check("denominations.m2p").not().isEmpty().isNumeric(),
    check("denominations.m5p").not().isEmpty().isNumeric(),
    check("denominations.m10p").not().isEmpty().isNumeric(),
    check("denominations.m20p").not().isEmpty().isNumeric(),
    check("denominations.b20p").not().isEmpty().isNumeric(),
    check("denominations.b50p").not().isEmpty().isNumeric(),
    check("denominations.b100p").not().isEmpty().isNumeric(),
    check("denominations.b200p").not().isEmpty().isNumeric(),
    check("denominations.b500p").not().isEmpty().isNumeric(),
    check("denominations.b1000p").not().isEmpty().isNumeric(),

    (req,res,next)=>{
        validator(req,res,next)
    }
]

module.exports = {validate}