const express = require('express')
const router = express.Router()

//aqui va el codigo
//funciones del controlador
const {index,show, search,update,destroy, createDebito,createCredito,createMorgages} = require('../controllers/clientController')
//funcion para validar campos
const {ValidateDebit, updateValidate} = require('../middleware/validators/clientValidator')
//verificar el token de inicio de sesion
const validateToken = require('../middleware/validateToken')
//ruta version 1
const {PATH_V1} = require('./1-paths')

//anomalies
router.get(`${PATH_V1}/clients/`, [validateToken], index);
router.get(`${PATH_V1}/clients/:id`,[validateToken],show)
router.post(`${PATH_V1}/clients/search/`,[validateToken],search)
router.post(`${PATH_V1}/clients/debit`,[validateToken],createDebito)
router.post(`${PATH_V1}/clients/credit`,[validateToken],createCredito)
router.post(`${PATH_V1}/clients/morgages`,[validateToken],createMorgages)

router.put(`${PATH_V1}/clients/:id`,update)
router.delete(`${PATH_V1}/clients/:id`,destroy)

module.exports = router
