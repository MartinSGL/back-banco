const express = require("express");
const router = express.Router();

//aqui va el codigo
//funciones del controlador
const {
  create,
  update,
  destroy,
} = require("../controllers/cardController");
//funcion para validar campos
const {validate} = require("../middleware/validators/cardValidator");
//verificar el token de inicio de sesion
const validateToken = require("../middleware/validateToken");
//ruta version 1
const { PATH_V1 } = require("./1-paths");

//anomalies
router.post(`${PATH_V1}/cards/:id`, [validateToken], create);
router.put(`${PATH_V1}/cards/:id`, [validateToken,validate], update);
router.delete(`${PATH_V1}/cards/:id`, [validateToken], destroy);

module.exports = router;
