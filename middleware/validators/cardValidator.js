const {check} = require('express-validator')
const {validator} = require('../../helpers/validator')

const validate = [

    check('nip').not().isEmpty().isNumeric().isLength({min: 4, max: 4}).withMessage('NIP must be 4 digits'),
    
    (req,res,next)=>{
        validator(req,res,next)
    }
]

module.exports = {validate}