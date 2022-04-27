const {check} = require('express-validator')
const {validator} = require('../../helpers/validator')

const validate = [
    check('name').not().isEmpty(),
    check('lastname').not().isEmpty(),
    check('address').not().isEmpty(),
    check('telephone').not().isEmpty().isNumeric().isLength({min: 10, max: 10}),
    check('MortgageId').not().isEmpty(),
    check('property.url').not().isEmpty(),
    check('property.value').not().isEmpty().isInt(),
    
    
    (req,res,next)=>{
        validator(req,res,next)
    }
]
const validateUpdate = [
  check("name").not().isEmpty(),
  check("lastname").not().isEmpty(),
  check("address").not().isEmpty(),
  check("telephone").not().isEmpty().isNumeric().isLength({ min: 10, max: 10 }),
  check("MortgageId").isEmpty(),
];


module.exports = {validate,validateUpdate};