const express = require('express')
const router = express.Router()
//funciones del controlador
const {create,validateT} = require('../controllers/tokenController')
//funcion para validar campos
const {validate} = require('../middleware/validators/tokenValidator')
//ruta version 1
const {PATH_V1} = require('./1-paths')

//anomalies
router.put(`${PATH_V1}/token/:id`,create)
router.post(`${PATH_V1}/token/:id`,validate,validateT)


module.exports = router