const express = require("express");
const router = express.Router();

const genresController = require("../controllers/genresController");

router
.get("/", genresController.detail);

module.exports = router;
