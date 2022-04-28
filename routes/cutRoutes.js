const express = require('express')
const router = express.Router()

//funciones del controlador
const {index,create,show,update,destroy,getCutInfoByExecutive} = require('../controllers/cutController')
//funcion para validar campos
const {validate} = require('../middleware/validators/cutValidator.js')
//verificar el token de inicio de sesion
const validateToken = require('../middleware/validateToken')
//ruta version 1
const {PATH_V1} = require('./1-paths')

//cuts
router.get(`${PATH_V1}/cuts/`,validateToken,index)
router.post(`${PATH_V1}/cuts/`,[validateToken,validate],create)
router.get(`${PATH_V1}/cuts/:id`,validateToken,show)
router.put(`${PATH_V1}/cuts/:id`,[validateToken,validate],update)
router.delete(`${PATH_V1}/cuts/:id`,validateToken,destroy)
router.get(`${PATH_V1}/cuts/search/cashboxes/`,validateToken,getCutInfoByExecutive)


module.exports = router