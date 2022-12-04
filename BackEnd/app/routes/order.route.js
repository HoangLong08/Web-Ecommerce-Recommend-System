const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { verify, isAdmin } = require("../utils/verify");

router.post("/add", verify, orderController.addOrder);
router.post(
  "/getOrderByIdCustomer",
  verify,
  orderController.getOrderByIdCustomer
);
// router.post('/detail', productController.getDetailProduct)

// admin
// router.post(
//   "/admin/orders",
//   verify,
//   isAdmin,
//   orderController.getAllBrandsAdmin
// );

module.exports = router;
