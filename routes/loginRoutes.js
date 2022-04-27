const express = require('express')
const router = express.Router()
//funciones del controlador
const {login} = require('../controllers/loginController')
//funcion para validar campos
const {validate} = require('../middleware/validators/loginValidator')
//ruta version 1
const {PATH_V1} = require('./1-paths')

//login
router.post(`${PATH_V1}/login/`,validate,login)


module.exports = router