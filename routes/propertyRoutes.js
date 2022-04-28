const express = require('express')
const router = express.Router()
//funciones del controlador
const {create,update,destroy} = require('../controllers/propertyController')
//funcion para validar campos
 const {validate} = require('../middleware/validators/propertyValidator')
//verificar el token de inicio de sesion
const validateToken = require('../middleware/validateToken')
//ruta version 1
const {PATH_V1} = require('./1-paths')

//anomalies
router.put(`${PATH_V1}/property/:id`,[validateToken,validate],update)

module.exports = router