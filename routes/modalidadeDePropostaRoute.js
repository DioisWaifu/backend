const express = require('express');
const router = express.Router();

//controllers
const modalidadeDePropostaController = require('../controllers/modalidadeDePropostaController');

//router.get('/test', modalidadeDePropostaController.test);
router.get('/list', modalidadeDePropostaController.list);

module.exports = router;
