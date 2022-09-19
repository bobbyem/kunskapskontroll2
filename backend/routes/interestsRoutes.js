const express = require("express");
const protect = require("../auth/protect");
const {
  addInterest,
  getInterests,
} = require("../controllers/interestsControllers");
const router = express.Router();

//Routes
router.post("/", protect, addInterest);
router.get("/", protect, getInterests);

module.exports = router;
