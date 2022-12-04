const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment.controller");
const { verify, isAdmin } = require("../utils/verify");

// router.get('/', productController.getAllProducts)
// router.post('/detail', productController.getDetailProduct)

// admin
router.post(
  "/create-payment-intent",
  verify,
  paymentController.createPaymentIntent
);

module.exports = router;
