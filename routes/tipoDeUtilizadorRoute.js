const express = require('express');
const router = express.Router();

//controllers
const tipoDeUtilizadorController = require('../controllers/tipoDeUtilizadorController');

//router.get('/test', tipoDeUtilizadorController.test);
router.get('/list', tipoDeUtilizadorController.list);

module.exports = router;
