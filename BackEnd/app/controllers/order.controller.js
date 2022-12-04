const Order = require("../models/order.model");

exports.addOrder = async (req, res, next) => {
  try {
    const { idCustomer, name, phone, address, note, listProduct } = req.body;
    const addOrder = await Order.addOrder(
      idCustomer,
      name,
      phone,
      address,
      note,
      listProduct
    );
    if (addOrder) {
      res.status(200).json({
        status: "200",
        msg: "Đặt hàng thành công",
        data: null,
      });
    } else {
      res.status(403).json({
        status: "403",
        msg: "You are not allowed to add order",
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
    const listOrderByIdCustomer = await Order.getOrderByIdCustomer(idCustomer);
    if (listOrderByIdCustomer) {
      res.status(200).json({
        status: "200",
        msg: "get list order success",
        data: listOrderByIdCustomer,
      });
    } else {
      res.status(403).json({
        status: "403",
        msg: "You are not allowed to add order",
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

// admin
