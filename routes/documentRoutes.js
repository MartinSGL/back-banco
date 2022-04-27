const express = require("express");
const router = express.Router();
const {
  create,
  update,
  destroy,
} = require("../controllers/documentController");
//Function validate fields
const { createValidate,updateValidate } = require("../middleware/validators/documentValidator");
//verificar el token de inicio de sesion
const validateToken = require("../middleware/validateToken");
//ruta version 1
const { PATH_V1 } = require("./1-paths");

//document
router.post(`${PATH_V1}/documents/`, [validateToken, createValidate], create);
router.put(`${PATH_V1}/documents/:id`, [validateToken, updateValidate], update);
router.delete(`${PATH_V1}/documents/:id`, validateToken, destroy);

module.exports = router;
