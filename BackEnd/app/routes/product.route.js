const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { verify, isAdmin } = require("../utils/verify");
const inputValidate = require("../utils/inputValidate");

router.get(
  "/",
  inputValidate.validateDetailProduct(),
  productController.getAllProducts
);
router.post("/detail", productController.getDetailProduct);
router.post("/product-similar", productController.fetchProductSimilar);
router.post("/productByCategory", productController.getAllProductByCategory);
router.post(
  "/product-similar-rating",
  productController.getProductRatingSimilar
);
router.get("/search", productController.getSearchListProduct);

//admin
router.post(
  "/admin/products",
  verify,
  isAdmin,
  productController.getAllProductsAdmin
);
router.post("/admin/add", verify, isAdmin, productController.addProductsAdmin);
router.post(
  "/admin/update",
  verify,
  isAdmin,
  productController.updateProductsAdmin
);

module.exports = router;
