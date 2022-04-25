const {check} = require('express-validator')
const {validator} = require('../../helpers/validator')

const validateDebit =[
    

    check('account.type').not().isEmpty(),
    check('account.amount').not().isEmpty(),

    check('beneficiary.*.name').not().isEmpty(),
    check('beneficiary.*.lastname').not().isEmpty(),
    check('beneficiary.*.relation').not().isEmpty(),
    check('beneficiary.*.percentage').not().isEmpty().isNumeric({min: 33, max: 100}),
    check('beneficiary.*.birth_date').not().isEmpty(),
    check('beneficiary.*.phone').not().isEmpty().isNumeric().isLength({min: 10, max: 12}),

    check('document.*.document_url').not().isEmpty(),
    check('document.*.type').not().isEmpty(),

    check('card.nip').not().isEmpty(),
 
    (req,res,next)=>{
        validator(req,res,next)
    }
]
const validateCredit =[
    

    check('account.type').not().isEmpty(),
    check('account.amount').not().isEmpty(),

    check('accountcredentials.CredentialId').not().isEmpty(),
    check('accountcredentials.AccountId').not().isEmpty(),

    check('document.*.document_url').not().isEmpty(),
    check('document.*.type').not().isEmpty(),

    check('card.nip').not().isEmpty(),
 
    (req,res,next)=>{
        validator(req,res,next)
    }
]

const validateMortgage =[
    

    check('account.type').not().isEmpty(),
    check('account.amount').not().isEmpty(),

    check('card.nip').not().isEmpty(),

    check('mortgage.solicited_date').not().isEmpty(),
    check('aproved_date').not().isEmpty(),
    check('mortgage.solicited_amount').not().isEmpty(),
    check('mortgage.aproved_amount').not().isEmpty(),
    check('mortgage.InterestId').not().isEmpty(),
    check('mortgage.AccountId').not().isEmpty(),
    
    check('guarantees.*.name').not().isEmpty(),
    check('guarantees.*.lastname').not().isEmpty(),
    check('guarantees.*.address').not().isEmpty(),
    check('guarantees.*.telephone').not().isEmpty().isNumeric().isLength({min: 10, max: 10}),
    check('guarantees.*.MortgageId').not().isEmpty(),

    check('properties.*.url').not().isEmpty(),
    check('properties.*.value').not().isEmpty(),
    check('properties.*.GuaranteeId').not().isEmpty(),

    (req,res,next)=>{
        validator(req,res,next)
    }
]

module.exports = {validateDebit, validateCredit, validateMortgage}