const express = require('express')
const router = express.Router()
//funciones del controlador
const {index,create,update,destroy} = require('../controllers/commissionController')
//funcion para validar campos
const {validate} = require('../middleware/validators/commissionValidator')
//ruta version 1
const {PATH_V1} = require('./1-paths')

//anomalies
router.get(`${PATH_V1}/commissions/`,index)
router.post(`${PATH_V1}/commissions/`,validate,create)
router.put(`${PATH_V1}/commissions/:id`,validate,update)
router.delete(`${PATH_V1}/commissions/:id`,destroy)

module.exports = router