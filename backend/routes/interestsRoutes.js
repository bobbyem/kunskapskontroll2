const express = require("express");
const { addInterest } = require("../controllers/interestsControllers");
const router = express.Router();

router.post("/", addInterest);

module.exports = router;
