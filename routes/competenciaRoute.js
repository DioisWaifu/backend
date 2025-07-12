const express = require("express");
const router = express.Router();

//controllers
const competenciaController = require("../controllers/competenciaController");

//router.get('/test', competenciaController.test);
router.get("/list", competenciaController.list);

module.exports = router;
