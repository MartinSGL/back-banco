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
const { validateDebit, validateCredit, validateMortgage,updateValidate } = require("../middleware/validators/accountValidator");
//verificar el token de inicio de sesion
const validateToken = require("../middleware/validateToken");
//ruta version 1
const { PATH_V1 } = require("./1-paths");

//anomalies
router.post(`${PATH_V1}/accounts/debit`,[validateToken,  validateDebit], createDebito);
router.post(`${PATH_V1}/accounts/credit`,[validateToken,validateCredit], createCredito);
router.post(`${PATH_V1}/accounts/mortgage`, [validateToken,validateMortgage], createMorgages);
router.put(`${PATH_V1}/accounts/:id`, [validateToken,updateValidate], update);
router.delete(`${PATH_V1}/accounts/:id`, [validateToken], destroy);

module.exports = router;
