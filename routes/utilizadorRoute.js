const express = require("express");
const router = express.Router();
const middleware = require("../middleware");

const utilizadorController = require("../controllers/utilizadorController");

router.get("/list",  utilizadorController.list);
router.post("/create",  utilizadorController.create);
router.get("/get/:id", utilizadorController.get);
router.put("/update/:id", utilizadorController.update);
router.post("/delete", utilizadorController.delete);

router.post("/register", utilizadorController.register);
router.post("/login", utilizadorController.login);

module.exports = router;
 


