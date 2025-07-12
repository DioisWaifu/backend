const express = require('express');
const router = express.Router();
const GestorController = require('../controllers/gestorController');

router.get('/test', GestorController.test);
router.get('/list', GestorController.list);

module.exports = router;
