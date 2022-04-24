const express = require("express");
const router = express.Router();

//aqui va el codigo
//funciones del controlador
const {
  index,
  show,
  update,
  destroy,
} = require("../controllers/morgageController");
//funcion para validar campos
const {
  insertValidate,
  updateValidate,
} = require("../middleware/validators/clientValidator");
//verificar el token de inicio de sesion
const validateToken = require("../middleware/validateToken");
//ruta version 1
const { PATH_V1 } = require("./1-paths");

//anomalies
router.get(`${PATH_V1}/morgages/`, index);
router.get(`${PATH_V1}/morgages/:id`, show);
router.put(`${PATH_V1}/morgages/:id`, update);
router.delete(`${PATH_V1}/morgages/:id`, destroy);

module.exports = router;
