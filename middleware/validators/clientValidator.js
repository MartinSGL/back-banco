const {check} = require('express-validator')
const {validator} = require('../../helpers/validator')

const insertValidate = [
    check('client.name').not().isEmpty(),
    check('client.lastname').not().isEmpty(),
    check('client.gender').not().isEmpty(),
    check('client.street').not().isEmpty(),
    check('client.number_ext').not().isEmpty(),
    check('client.colony').not().isEmpty(),
    check('client.postalcode').not().isEmpty(),
    check('client.city').not().isEmpty(),
    check('client.municipality').not().isEmpty(),
    check('client.state').not().isEmpty(),
    check('client.celphone').not().isEmpty(),
    check('client.landline').not().isEmpty(),
    check('client.curp').not().isEmpty().isLength({min: 18, max: 18}),
    check('client.rfc').not().isEmpty().isLength({min: 12, max: 13}),
    check('client.no_ine').not().isEmpty().isLength({min: 18, max: 18}),
    check('client.email').not().isEmpty(),
    
    check('account.type').not().isEmpty(),
    check('account.amount').not().isEmpty(),

    check('beneficiary.*.name').not().isEmpty(),
    check('beneficiary.*.lastname').not().isEmpty(),
    check('beneficiary.*.relation').not().isEmpty(),
    check('beneficiary.*.percentage').not().isEmpty().isNumeric({min: 33, max: 100}),
    check('beneficiary.*.birth_date').not().isEmpty(),
    check('beneficiary.*.phone').not().isEmpty(),

    check('document.*.document_url').not().isEmpty(),
    check('document.*.type').not().isEmpty(),

    check('card.nip').not().isEmpty(),
 
    (req,res,next)=>{
        validator(req,res,next)
    }
]

const updateValidate = [
    check('client.name').not().isEmpty(),
    check('client.lastname').not().isEmpty(),
    check('client.gender').not().isEmpty(),
    check('client.street').not().isEmpty(),
    check('client.number_ext').not().isEmpty(),
    check('client.colony').not().isEmpty(),
    check('client.postalcode').not().isEmpty(),
    check('client.city').not().isEmpty(),
    check('client.municipality').not().isEmpty(),
    check('client.state').not().isEmpty(),
    check('client.celphone').not().isEmpty(),
    check('client.landline').not().isEmpty(),
    check('client.curp').not().isEmpty().isLength({min: 18, max: 18}),
    check('client.rfc').not().isEmpty().isLength({min: 12, max: 13}),
    check('client.no_ine').not().isEmpty().isLength({min: 18, max: 18}),
    check('client.email').not().isEmpty(),
    check('client.ExecutiveId').not().isEmpty(),

    (req,res,next)=>{
        validator(req,res,next)
    }
]

module.exports = {insertValidate,updateValidate}