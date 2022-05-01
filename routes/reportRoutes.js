const express = require('express')
const router = express.Router()
//funciones del controlador
const {getAccounts,getTransactions,accountStatus,sendData,getRepositionsByDay, getdebtors} = require('../controllers/reportController')
//verificar el token de inicio de sesion
const validateToken = require('../middleware/validateToken')
//ruta version 1
const {PATH_V1} = require('./1-paths')

//anomalies
router.get(`${PATH_V1}/reports/accounts`,validateToken,getAccounts)
router.get(`${PATH_V1}/reports/transactions`,validateToken,getTransactions)
router.get(`${PATH_V1}/reports/accountStatus/:id`,validateToken,accountStatus)
router.get(`${PATH_V1}/reports/sendData/:id`,validateToken,sendData)
router.get(`${PATH_V1}/reports/repositions`,validateToken,getRepositionsByDay)
router.get(`${PATH_V1}/reports/debtors`,validateToken,getdebtors)

module.exports = router