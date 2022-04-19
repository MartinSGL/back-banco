const express = require('express')
const router = express.Router()
const {create,index,show,update,destroy} = require('../controllers/executiveController');
const {validateC,validateU} = require('../middleware/validators/executiveValidator')
const validateToken = require('../middleware/validateToken')
const {PATH_V1} = require('./1-paths');

router.get(`${PATH_V1}/executives`,validateToken,index);
router.post(`${PATH_V1}/executives`,[validateToken,validateC],create);
router.get(`${PATH_V1}/executives/:id`,validateToken,show);
router.put(`${PATH_V1}/executives/:id`,[validateToken,validateU],update);
router.delete(`${PATH_V1}/executives/:id`,validateToken,destroy);

module.exports = router