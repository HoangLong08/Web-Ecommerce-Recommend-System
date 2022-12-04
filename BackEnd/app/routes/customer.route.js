const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");
const { verify, isAdmin } = require("../utils/verify");

// router.get('/', productController.getAllProducts)
// router.post('/detail', productController.getDetailProduct)

// admin
router.post("/detail", verify, customerController.postDetailCustomer);
router.post("/update", verify, customerController.updateInfoCustomer);
router.post("/order", verify, customerController.getOrderByIdCustomer);

module.exports = router;
