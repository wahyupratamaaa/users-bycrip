const express = require("express");
const router = express.Router();
const home = require("./home");
const login = require("./login");
const middlewere = require("../config/middlewere");

router.use("/login", login);
router.use("/home", middlewere.verifikasi, home);

module.exports = router;
