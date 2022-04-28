const {check} = require('express-validator')
const { buildCheckFunction } = require("express-validator");
const res = require('express/lib/response')
const {validator} = require('../../helpers/validator')
const checkBody = buildCheckFunction(["body"]);

const createValidate = [
  check("document_url").not().isEmpty().isURL().withMessage("Invalid URL"),
  check("type")
    .not()
    .isEmpty()
    .custom((value) => {
      //type must be either ine, income or address
      if (value !== "ine" && value !== "income" && value !== "address") {
        throw new Error("Invalid type");
      }
      return true;
    }),

  
  (req, res, next) => {
    validator(req, res, next);
  },
];

const updateValidate = [
    check('document_url').not().isEmpty().isURL().withMessage('Invalid URL'),
    check('type').isEmpty(),

    
 
    (req,res,next)=>{
        validator(req,res,next)
    }
]

module.exports = {createValidate,updateValidate}