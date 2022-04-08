const express = require('express')
const router = express.Router()
const { index, create, show, update, destroy } = require('../controllers/denominationController')
//Function validate fields
const { validate } = require('../middleware/validators/denominationValidator')

//ruta version 1
const { PATH_V1 } = require('./1-paths')

//denomination
router.get(`${PATH_V1}/denominations/`, index);
router.post(`${PATH_V1}/denominations/`, validate, create);
router.get(`${PATH_V1}/denominations/:id`, show)
router.put(`${PATH_V1}/denominations/:id`, validate, update)
router.delete(`${PATH_V1}/denominations/:id`, destroy)

module.exports = router;