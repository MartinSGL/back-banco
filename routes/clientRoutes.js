const express = require('express')
const router = express.Router()

//aqui va el codigo
//funciones del controlador
const {index,show, search,create,update,destroy} = require('../controllers/clientController')
//funcion para validar campos
const {insertValidate, updateValidate} = require('../middleware/validators/clientValidator')
//verificar el token de inicio de sesion
const validateToken = require('../middleware/validateToken')
//ruta version 1
const {PATH_V1} = require('./1-paths')

//anomalies
router.get(`${PATH_V1}/clients/`,index)
router.get(`${PATH_V1}/clients/:id`,show)
router.post(`${PATH_V1}/clients/search/`,search)
router.post(`${PATH_V1}/clients/`,insertValidate,create)
router.put(`${PATH_V1}/clients/:id`,updateValidate,update)
router.delete(`${PATH_V1}/clients/:id`,destroy)

module.exports = router
