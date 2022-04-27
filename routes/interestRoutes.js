const express = require('express');
const router = express.Router();
const {create,index,update,destroy} = require('../controllers/interestsController');
const {validate} = require('../middleware/validators/interestsValidator');
const validateToken = require('../middleware/validateToken');
const {PATH_V1} = require('./1-paths');


//interest
router.get(`${PATH_V1}/interests`,validateToken,index);
router.post(`${PATH_V1}/interests`,[validateToken,validate],create);
router.put(`${PATH_V1}/interests/:id`,[validateToken,validate],update);
router.delete(`${PATH_V1}/interests/:id`,validateToken,destroy);



module.exports = router