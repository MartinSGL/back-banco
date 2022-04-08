const express = require('express')
const router = express.Router()
//funciones del controlador
const {index,create,update,destroy} = require('../controllers/positionController')
//funcion para validar campos
const {validate} = require('../middleware/validators/positionValidator')
//ruta version 1
const {PATH_V1} = require('./1-paths')

//anomalies
router.get(`${PATH_V1}/positions/`,index)
router.post(`${PATH_V1}/positions/`,validate,create)
router.put(`${PATH_V1}/positions/:id`,validate,update)
router.delete(`${PATH_V1}/positions/:id`,destroy)

module.exports = router