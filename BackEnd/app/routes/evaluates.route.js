const express = require("express");
const router = express.Router();
const evaluateController = require("../controllers/evaluates.controller");
const verifyClient = require("../utils/verifyClient");

// router.get('/', productController.getAllProducts)
// router.post('/detail', productController.getDetailProduct)

router.post("/get", evaluateController.getEvaluateByIdProduct);
router.post("/add", verifyClient, evaluateController.postEvaluate);

module.exports = router;
