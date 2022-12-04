const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { verify } = require("../utils/verify");

router.post("/loginUser", authController.loginUser);
router.post("/registerUser", authController.registerUser);
router.post("/loginAdmin", authController.loginAdmin);
router.post("/refresh", authController.refreshAdmin);
router.post("/admin/logout", verify, authController.logoutAdmin);

module.exports = router;
