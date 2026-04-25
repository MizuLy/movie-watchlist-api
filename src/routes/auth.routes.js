const express = require("express");

const { register, login, logout } = require("../controllers/auth.controller");
const validateRequest = require("../middleware/validateRequest");
const { loginSchema, registerSchema } = require("../validators/authValidator");

const router = express.Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.post("/logout", logout);

module.exports = router;
