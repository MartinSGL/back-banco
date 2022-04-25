const express = require('express');
const router = express.Router();
const {PATH_V1} = require('./1-paths');
const {create,index,update,destroy} = require('../controllers/creditdetailsController');
const {validate} = require('../middleware/validators/creditdetailsValidator');
const validateToken = require('../middleware/validateToken');

//codigo
router.get(`${PATH_V1}/creditdetails`,validateToken,index);
router.post(`${PATH_V1}/creditdetails`,[validateToken,validate],create);
router.put(`${PATH_V1}/creditdetails/:id`,[validateToken,validate],update);
router.delete(`${PATH_V1}/creditdetails/:id`,validateToken,destroy);


module.exports = router