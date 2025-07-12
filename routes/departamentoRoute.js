const express = require('express');
const router = express.Router();
const DepartamentoController = require('../controllers/departamentoController');

router.get('/test', DepartamentoController.test);
router.get('/list', DepartamentoController.list);

module.exports = router;
