const express = require('express')
const router = express.Router()
const {create,index,show,update,destroy} = require('../controllers/executiveController');
const {validate} = require('../middleware/validators/executiveValidator')
const {PATH_V1} = require('./1-paths');

router.post(`${PATH_V1}/executives`,validate,create);
router.get(`${PATH_V1}/executives`,index);
router.get(`${PATH_V1}/executives/:id`,show);
router.put(`${PATH_V1}/executives/:id`,validate,update);
router.delete(`${PATH_V1}/executives/:id`,destroy);

module.exports = router