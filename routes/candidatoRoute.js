const express = require('express');
const router = express.Router();

//controllers
const candidatoController = require('../controllers/candidatoController');

//router.get('/test', candidatoController.test);
router.get('/list', candidatoController.list);



module.exports = router;
