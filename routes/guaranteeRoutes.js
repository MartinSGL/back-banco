const express = require('express')
const router = express.Router()
//funciones del controlador
const {create,update,destroy} = require('../controllers/guaranteeController')
//funcion para validar campos
const {validate,validateUpdate} = require('../middleware/validators/guaranteeValidator')
//verificar el token de inicio de sesion
const validateToken = require('../middleware/validateToken')
//ruta version 1
const {PATH_V1} = require('./1-paths')

//anomalies
router.post(`${PATH_V1}/guarantee/`,[validateToken,validate],create)
router.put(`${PATH_V1}/guarantee/:id`,[validateToken,validateUpdate],update)
router.delete(`${PATH_V1}/guarantee/:id`,validateToken,destroy)

module.exports = router