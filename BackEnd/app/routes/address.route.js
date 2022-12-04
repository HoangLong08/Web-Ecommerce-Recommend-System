const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address.controller");

router.post("/city", addressController.getAllCity);
router.post("/district", addressController.getListDistrictByIdCity);
router.post("/street", addressController.getListStreetByIdDistrict);
module.exports = router;
