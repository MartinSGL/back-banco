const express = require("express");
const router = express.Router();

//aqui va el codigo
//funciones del controlador
const {
  index,
  show,
  update,
  destroy,
} = require("../controllers/mortgageController");
//funcion para validar campos
const {validate} = require("../middleware/validators/mortgageValidator");
//verificar el token de inicio de sesion
const validateToken = require("../middleware/validateToken");
//ruta version 1
const { PATH_V1 } = require("./1-paths");

//anomalies
router.get(`${PATH_V1}/mortgages/`,[validateToken], index);
router.get(`${PATH_V1}/mortgages/:id`, [validateToken], show);
router.put(`${PATH_V1}/mortgages/:id`,[validateToken,validate], update);
router.delete(`${PATH_V1}/mortgages/:id`, [validateToken], destroy);

module.exports = router;
