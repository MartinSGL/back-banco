const {check} = require('express-validator')
const { buildCheckFunction } = require("express-validator");
const res = require('express/lib/response')
const {validator} = require('../../helpers/validator')
const checkBody = buildCheckFunction(["body"]);

// const insertValidate = [
//     check('client.name').not().isEmpty(),
//     check('client.lastname').not().isEmpty(),
//     check('client.gender').not().isEmpty(),
//     check('client.street').not().isEmpty(),
//     check('client.number_ext').not().isEmpty(),
//     check('client.colony').not().isEmpty(),
//     check('client.postalcode').not().isEmpty(),
//     check('client.city').not().isEmpty(),
//     check('client.municipality').not().isEmpty(),
//     check('client.state').not().isEmpty(),
//     check('client.celphone').not().isEmpty(),
//     check('client.landline').not().isEmpty(),
//     check('client.curp').not().isEmpty().isLength({min: 18, max: 18}),
//     check('client.rfc').not().isEmpty().isLength({min: 12, max: 13}),
//     check('client.no_ine').not().isEmpty().isLength({min: 18, max: 18}),
//     check('client.email').not().isEmpty(),
    
//     check('account.type').not().isEmpty(),
//     check('account.amount').not().isEmpty(),

//     check('beneficiaries.*.name').not().isEmpty(),
//     check('beneficiaries.*.lastname').not().isEmpty(),
//     check('beneficiaries.*.relation').not().isEmpty(),
//     check('beneficiaries.*.percentage').not().isEmpty().isNumeric({min: 33, max: 100}),
//     check('beneficiaries.*.birth_date').not().isEmpty(),
//     check('beneficiaries.*.phone').not().isEmpty(),

//     check('document.*.document_url').not().isEmpty(),
//     check('document.*.type').not().isEmpty(),

//     check('card.nip').not().isEmpty(),
 
//     (req,res,next)=>{
//         validator(req,res,next)
//     }
// ]

const validateDebit =[
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
    check('client.celphone').not().isEmpty().isNumeric().isLength({min: 10, max: 12}),
    check('client.landline').not().isEmpty(),
    check('client.curp').not().isEmpty().isLength({min: 18, max: 18}),
    check('client.rfc').not().isEmpty().isLength({min: 12, max: 13}),
    check('client.no_ine').not().isEmpty().isLength({min: 18, max: 18}),
    check('client.email').not().isEmpty(),

    check('account.amount').not().isEmpty(),

    check('beneficiaries.*.name').not().isEmpty(),
    check('beneficiaries.*.lastname').not().isEmpty(),
    check('beneficiaries.*.relation').not().isEmpty(),
    check('beneficiaries.*.percentage').not().isEmpty().isNumeric({min: 33, max: 100}),
    //percentage can't sum grater than 100
    check('beneficiaries').custom((req)=>{
        let percentage = 0
        let beneficiaries = req
        beneficiaries.forEach(element => {
            
            percentage += parseInt(element.percentage)
        });
        if(percentage > 100){
            throw new Error('The percentage can not be greater than 100')
        }
        return true
    }),
    check('beneficiaries.*.birth_date').not().isEmpty(),
    check('beneficiaries.*.phone').not().isEmpty().isNumeric().isLength({min: 10, max: 12}),

    //check that there are 3 documents in the array
    check('documents').not().isEmpty().isArray({min: 3, max: 3}),
    //check that they all have different types and the types must be ine, address, income
    check('documents').not().isEmpty().custom((req)=>{
        let types = []
        req.forEach(element => {
            types.push(element.type)
        });
        if(types.length == 3){
            if(types.includes('ine') && types.includes('address') && types.includes('income')){
                return true
            }
        }
        throw new Error('The documents must be ine, address, income')
    }),
    check('documents.*.document_url').not().isEmpty(),
    check('documents.*.type').not().isEmpty(),
 
    (req,res,next)=>{
        validator(req,res,next)
    }
]
const validateCredit =[
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
    check('client.celphone').not().isEmpty().isNumeric().isLength({min: 10, max: 12}),
    check('client.landline').not().isEmpty().isNumeric().isLength({min: 10, max: 12}),
    check('client.curp').not().isEmpty().isLength({min: 18, max: 18}),
    check('client.rfc').not().isEmpty().isLength({min: 12, max: 13}),
    check('client.no_ine').not().isEmpty().isLength({min: 18, max: 18}),
    check('client.email').not().isEmpty(),

    check('account.amount').not().isEmpty(),

    check('documents').not().isEmpty().custom((req)=>{
        let types = []
        req.forEach(element => {
            types.push(element.type)
        });
        if(types.length == 3){
            if(types.includes('ine') && types.includes('address') && types.includes('income')){
                return true
            }
        }
        throw new Error('The documents must be ine, address, income')
    }),
    check('documents.*.document_url').not().isEmpty(),
    check('documents.*.type').not().isEmpty(),
 
    (req,res,next)=>{
        validator(req,res,next)
    }
]

const validateMortgage = [
  check("client.name").not().isEmpty(),
  check("client.lastname").not().isEmpty(),
  check("client.gender").not().isEmpty(),
  check("client.street").not().isEmpty(),
  check("client.number_ext").not().isEmpty(),
  check("client.colony").not().isEmpty(),
  check("client.postalcode").not().isEmpty(),
  check("client.city").not().isEmpty(),
  check("client.municipality").not().isEmpty(),
  check("client.state").not().isEmpty(),
  check("client.celphone")
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({ min: 10, max: 12 }),
  check("client.landline")
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({ min: 10, max: 12 }),
  check("client.curp").not().isEmpty().isLength({ min: 18, max: 18 }),
  check("client.rfc").not().isEmpty().isLength({ min: 12, max: 13 }),
  check("client.no_ine").not().isEmpty().isLength({ min: 18, max: 18 }),
  check("client.email").not().isEmpty(),

  check("account.amount").not().isEmpty(),

  check("mortgage.solicited_date").not().isEmpty(),
  check("mortgage.solicited_amount").not().isEmpty(),
  check("mortgage.InterestId").not().isEmpty(),

  check("guarantees").isArray({ min: 1, max: 3 }),
  check("guarantees.*.name").not().isEmpty(),
  check("guarantees.*.lastname").not().isEmpty(),
  check("guarantees.*.address").not().isEmpty(),
  check("guarantees.*.telephone")
    .not()
    .isEmpty()
    .isNumeric()
    .isLength({ min: 10, max: 12 }),

  //check that properties array are the same elements as guarantees array
  checkBody()
    .not()
    .isEmpty()
    .custom((req) => {
        
      let properties = (req.properties).map((m) => {
        return Object.values(m);
      });

      let guarantees = (req.guarantees).map((m) => {
        return Object.values(m);
      });
      
      if (properties.length == guarantees.length) {
        return true;
      }
      throw new Error("The properties must be the same elements as guarantees");
    }),

  check("properties.*.url").not().isEmpty(),
  check("properties.*.value").not().isEmpty(),

  (req, res, next) => {
    validator(req, res, next);
  },
];

const updateValidate = [
    check('name').not().isEmpty(),
    check('lastname').not().isEmpty(),
    check('gender').not().isEmpty(),
    check('street').not().isEmpty(),
    check('number_ext').not().isEmpty(),
    check('colony').not().isEmpty(),
    check('postalcode').not().isEmpty(),
    check('city').not().isEmpty(),
    check('municipality').not().isEmpty(),
    check('state').not().isEmpty(),
    check('celphone').not().isEmpty().isNumeric().isLength({min:10,max:10}),
    check('landline').not().isEmpty().isNumeric().isLength({min:10,max:12}),
    check('curp').not().isEmpty().isLength({min: 18, max: 18}),
    check('rfc').not().isEmpty().isLength({min: 12, max: 13}),
    check('no_ine').not().isEmpty().isLength({min: 18, max: 18}),
    check('email').not().isEmpty(),

    (req,res,next)=>{
        validator(req,res,next)
    }
]

module.exports = {validateDebit,validateCredit,validateMortgage,updateValidate}