const { check } = require("express-validator");
const { validator } = require("../../helpers/validator");

const validate = [
    //validate
    //  name
    //     lastname
    //     relation
    //     percentage
    //     birth_date
    //     phone
    //     email
    //     AccountId
    check("name").not().isEmpty(),
    check("lastname").not().isEmpty(),
    check("relation").not().isEmpty(),
    check("percentage").not().isEmpty(),
    check("birth_date").not().isEmpty(),
    check("phone").not().isEmpty().isNumeric().isLength({ min: 10, max: 10 }),
    check("email").not().isEmpty(),
    check("AccountId").not().isEmpty(),

  (req, res, next) => {
    validator(req, res, next);
  },
];

module.exports = { validate };
