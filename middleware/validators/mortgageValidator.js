const {check} = require('express-validator')
const {validator} = require('../../helpers/validator')

const validate = [
  check("aproved_date").isEmpty(),
  check("aproved_amount").not().isEmpty(),
  check("solicited_date").isEmpty(),
  check("solicited_amount").isEmpty(),
  check("InterestId").isEmpty(),

  (req, res, next) => {
    validator(req, res, next);
  },
];

module.exports = {validate}