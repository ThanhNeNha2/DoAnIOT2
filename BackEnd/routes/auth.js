const router = require("express").Router();

import { login, register, logout } from "../controller/authController";
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

module.exports = router;
