const {check} = require('express-validator');
const {validator} = require('../../helpers/validator');

const validate = [

    check('name').not().isEmpty(),
    check('debterms').not().isEmpty().isNumeric(),
    check('interest').not().isEmpty().isFloat(),
    check('extra_charge').not().isEmpty().isFloat(),

    (req,res,next)=>{
        validator(req,res,next)
    }

]

module.exports = {validate} 