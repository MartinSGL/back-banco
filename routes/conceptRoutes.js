const express = require('express')
const router = express.Router()

//funciones del controlador
const {index,create,update,destroy} = require('../controllers/conceptController')
//funcion para validar campos
const {validate} = require('../middleware/validators/conceptValidator.js')
//ruta version 1
const {PATH_V1} = require('./1-paths')

//anomalies
router.get(`${PATH_V1}/concepts/`,index)
router.post(`${PATH_V1}/concepts/`,validate,create)
router.put(`${PATH_V1}/concepts/:id`,validate,update)
router.delete(`${PATH_V1}/concepts/:id`,destroy)


module.exports = router