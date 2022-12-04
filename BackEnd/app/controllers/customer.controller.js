const Customer = require("../models/customer.model");

exports.postDetailCustomer = async (req, res, next) => {
  try {
    const { idCustomer } = req.body;
    const detailCustomer = await Customer.detailCustomer(idCustomer);
    console.log("detailCustomer: ", detailCustomer);
    if (detailCustomer) {
      res.status(200).json({
        status: "200",
        msg: "get detail customer success",
        data: detailCustomer,
      });
    } else {
      res.status(404).json({
        status: "404",
        msg: "You are not found customer detail",
        data: null,
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateInfoCustomer = async (req, res, next) => {
  try {
    const { idCustomer, avatar, name, phone } = req.body;
    const updateCustomer = await Customer.updateInfoCustomer(
      idCustomer,
      avatar,
      name,
      phone
    );
    if (updateCustomer) {
      res.status(200).json({
        status: "200",
        msg: "update info customer success",
        data: {},
      });
    } else {
      res.status(403).json({
        status: "403",
        msg: "You are not allowed to update info customer",
        data: null,
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getOrderByIdCustomer = async (req, res, next) => {
  try {
    const { idCustomer } = req.body;
    const getOrder = await Customer.getOrderByIdCustomer(idCustomer);
    console.log("getOrder: ", getOrder);
    if (getOrder) {
      res.status(200).json({
        status: "200",
        msg: "get order success",
        data: getOrder,
      });
    } else {
      res.status(403).json({
        status: "403",
        msg: "You are not allowed to get order",
        data: null,
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
