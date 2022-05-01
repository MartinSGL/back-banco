const express = require('express')
const router = express.Router()

//aqui va el codigo
//funciones del controlador
const {initial,final} = require('../controllers/cashboxController')
//funcion para validar campos
// const {ValidateDebit, updateValidate} = require('../middleware/validators/clientValidator')
//verificar el token de inicio de sesion
const validateToken = require('../middleware/validateToken')
//ruta version 1
const {PATH_V1} = require('./1-paths')

//cashbox
router.get(`${PATH_V1}/cashboxes/initial`, [validateToken], initial);
router.get(`${PATH_V1}/cashboxes/final`, [validateToken], final);


module.exports = router