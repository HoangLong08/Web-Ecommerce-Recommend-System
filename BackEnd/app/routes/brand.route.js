const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brand.controller");
const { verify, isAdmin } = require("../utils/verify");

// router.get('/', productController.getAllProducts)
// router.post('/detail', productController.getDetailProduct)

// admin
router.post(
  "/admin/brands",
  verify,
  isAdmin,
  brandController.getAllBrandsAdmin
);

module.exports = router;
