const express = require("express");
const router = express.Router();
const { loginUser, addUser } = require("../controllers/userControllers");

router.post("/signup", addUser);
router.post("/login", loginUser);

module.exports = router;
