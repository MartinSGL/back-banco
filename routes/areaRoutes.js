const express = require('express')
const router = express.Router()
//funciones del controlador
const {index,create,update,destroy} = require('../controllers/areaController')
//funcion para validar campos
const {validate} = require('../middleware/validators/areaValidator')
//ruta version 1
const {PATH_V1} = require('./1-paths')

//anomalies
router.get(`${PATH_V1}/areas/`,index)
router.post(`${PATH_V1}/areas/`,validate,create)
router.put(`${PATH_V1}/areas/:id`,validate,update)
router.delete(`${PATH_V1}/areas/:id`,destroy)

module.exports = router