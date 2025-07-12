const express = require('express');
const router = express.Router();

//controllers
const tipoDePropostaController = require('../controllers/tipoDePropostaController');

//router.get('/test', tipoDePropostaController.test);
router.get('/list', tipoDePropostaController.list);

module.exports = router;
