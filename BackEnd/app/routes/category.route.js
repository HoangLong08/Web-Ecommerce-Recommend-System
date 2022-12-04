const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const { verify, isAdmin } = require("../utils/verify");

// router.get('/', productController.getAllProducts)
// router.post('/detail', productController.getDetailProduct)

//admin
router.post(
  "/admin/categories",
  verify,
  isAdmin,
  categoryController.getAllCategoryAdmin
);
router.post(
  "/admin/update",
  verify,
  isAdmin,
  categoryController.postCategoryAdmin
);
router.delete(
  "/admin/delete/:idCategory",
  verify,
  isAdmin,
  categoryController.deleteCategoryAdmin
);
router.post("/admin/detail", categoryController.detailProductsAdmin);
router.post("/admin/add", verify, isAdmin, categoryController.addProductsAdmin);

module.exports = router;
