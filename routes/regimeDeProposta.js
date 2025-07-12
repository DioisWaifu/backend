const express = require('express');
const router = express.Router();

//controllers
const regimeDePropostaController = require('../controllers/regimeDePropostaController');

//router.get('/test', regimeDePropostaController.test);
router.get('/list', regimeDePropostaController.list);

module.exports = router;
