const express = require('express')
const router = express.Router()
//funciones del controlador
const {index,create,searchByCard} = require('../controllers/transactionController')
//funcion para validar campos
const {validate} = require('../middleware/validators/transactionValidator')
//verificar el token de inicio de sesion
const validateToken = require('../middleware/validateToken')
const validateTokenTransaction = require('../middleware/validateTokenTransaction')
//ruta version 1
const {PATH_V1} = require('./1-paths')

//transaction
router.get(`${PATH_V1}/transactions/:search`,validateToken,index)
router.post(`${PATH_V1}/transactions/`,[validateToken,validate],create)
router.get(`${PATH_V1}/transactions/client/:card_s`,validateToken,searchByCard)

module.exports = router