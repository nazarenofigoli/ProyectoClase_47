const express = require("express");
const router = express.Router();

const indexController = require("../controllers/indexController");

router
.get("/", indexController.home)
.get("/favoritas", indexController.favoritas);

module.exports = router;
