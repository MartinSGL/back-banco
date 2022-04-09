const express = require('express')
const router = express.Router()

//funciones del controlador
const {index,create,update,destroy} = require('../controllers/conceptController')
//funcion para validar campos
const {validate} = require('../middleware/validators/conceptValidator.js')
//verificar el token de inicio de sesion
const validateToken = require('../middleware/validateToken')
//ruta version 1
const {PATH_V1} = require('./1-paths')

//anomalies
router.get(`${PATH_V1}/concepts/`,validateToken,index)
router.post(`${PATH_V1}/concepts/`,[validateToken,validate],create)
router.put(`${PATH_V1}/concepts/:id`,[validateToken,validate],update)
router.delete(`${PATH_V1}/concepts/:id`,validateToken,destroy)


module.exports = router