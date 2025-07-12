const express = require('express');
const router = express.Router();

const propostaController = require('../controllers/propostaController');

router.get('/list', propostaController.list);
router.post('/create', propostaController.create);
router.get('/get/:id',propostaController.get);
router.put('/update/:id', propostaController.update);
router.post('/delete', propostaController.delete);


module.exports = router;