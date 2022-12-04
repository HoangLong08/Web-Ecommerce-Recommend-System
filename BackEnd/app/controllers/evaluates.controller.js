const Evaluate = require("../models/evaluates.model");

exports.getEvaluateByIdProduct = async (req, res, next) => {
  try {
    const { idProduct } = req.body;
    console.log("idProduct: ", idProduct);
    const listEvaluate = await Evaluate.getEvaluateByIdProduct(idProduct);
    console.log("listEvaluate: ", listEvaluate);
    if (!listEvaluate) {
      res.status(404).send({
        status: "404",
        msg: "Not found",
        data: null,
      });
    } else {
      res.status(200).json({
        status: "200",
        msg: "get evaluate success",
        data: listEvaluate,
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.postEvaluate = async (req, res, next) => {
  try {
    const { idCustomer, idProduct, title, content, stars } = req.body;
    const evaluates = await Evaluate.postEvaluate(
      idCustomer,
      idProduct,
      title,
      content,
      stars
    );
    if (!evaluates?.idValuate) {
      res.status(404).send({
        status: "404",
        msg: "Not found",
        data: null,
      });
    } else {
      res.status(200).json({
        status: "200",
        msg: "Đánh giá thành công",
        data: evaluates,
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
