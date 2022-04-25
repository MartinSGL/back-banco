const express = require("express");
const router = express.Router();
//funciones del controlador
const {
  update,
  destroy,
  createDebito,
  createCredito,
  createMorgages,
} = require("../controllers/accountController");
//funcion para validar campos
const { validate } = require("../middleware/validators/areaValidator");
//verificar el token de inicio de sesion
const validateToken = require("../middleware/validateToken");
//ruta version 1
const { PATH_V1 } = require("./1-paths");

//anomalies
router.post(`${PATH_V1}/accounts/debit`,[validateToken], createDebito);
router.post(`${PATH_V1}/accounts/credit`,[validateToken], createCredito);
router.post(`${PATH_V1}/accounts/mortgage`, [validateToken], createMorgages);
router.put(`${PATH_V1}/accounts/:id`, [validateToken], update);
router.delete(`${PATH_V1}/accounts/:id`, [validateToken], destroy);

module.exports = router;
