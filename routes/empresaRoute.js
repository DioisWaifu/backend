const express = require('express');
const router = express.Router();

//controllers
const empresaController = require('../controllers/empresaController');

//router.get('/test', empresaController.test);
router.get('/list', empresaController.list);

module.exports = router;
