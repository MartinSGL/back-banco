const { check } = require('express-validator')
const { validator } = require('../../helpers/validator')

const validate = [
  check('id').not().isEmpty(),
  check('name').not().isEmpty(),
  check('value').not().isEmpty(),

  (req, res, next) => {
    validator(req, res, next)
  }
]

module.exports = { validate }