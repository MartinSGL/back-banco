const express = require('express')
const router = express.Router()
const { index, create, show, update, destroy } = require('../controllers/denominationController')
//Function validate fields
const { validate } = require('../middleware/validators/denominationValidator')
//verificar el token de inicio de sesion
const validateToken = require('../middleware/validateToken')
//ruta version 1
const { PATH_V1 } = require('./1-paths')

//denomination
router.get(`${PATH_V1}/denominations/`, validateToken,index)
router.post(`${PATH_V1}/denominations/`, [validateToken,validate], create)
router.get(`${PATH_V1}/denominations/:id`, [validateToken],show)
router.put(`${PATH_V1}/denominations/:id`, [validateToken,validate], update)
router.delete(`${PATH_V1}/denominations/:id`, validateToken,destroy)

module.exports = router;