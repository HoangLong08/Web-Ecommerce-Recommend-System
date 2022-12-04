const Product = require("../models/product.model");

exports.getAllProducts = async (req, res, next) => {
  try {
    const [allProducts] = await Product.fetchAll();
    res.status(200).json(allProducts);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getAllProductByCategory = async (req, res, next) => {
  try {
    const { nameUrl } = req.body; // dien-thoai
    const [allProducts] = await Product.getAllProductByCategory(nameUrl);
    res.status(200).json({
      status: "200",
      msg: "success",
      data: allProducts,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getProductRatingSimilar = async (req, res, next) => {
  try {
    const { idCustomer } = req.body; // dien-thoai
    const allProducts = await Product.fetchProductRatingSimilar(idCustomer);
    res.status(200).json({
      status: "200",
      msg: "success",
      data: allProducts,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getSearchListProduct = async (req, res, next) => {
  try {
    // dien-thoai
    console.log("req.query: ", req.query);
    const allProducts = await Product.getSearchListProduct(req.query);
    // console.log("allProducts product: ", allProducts);
    res.status(200).json({
      status: "200",
      msg: "success",
      data: allProducts,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getDetailProduct = async (req, res, next) => {
  try {
    const { idProduct } = req.body;
    if (!idProduct) {
      res.status(404).send({
        status: "404",
        msg: "Not found",
        data: null,
      });
    } else {
      const detailProduct = await Product.detail(idProduct);
      if (!detailProduct?.idProduct) {
        res.status(404).send({
          status: "404",
          msg: "Not found",
          data: null,
        });
      } else {
        res.status(200).json(detailProduct);
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

// admin

exports.getAllProductsAdmin = async (req, res, next) => {
  try {
    const [allProducts] = await Product.fetchAllAdmin();
    if (allProducts) {
      res.status(200).json(allProducts);
    } else {
      res.status(403).json({
        status: "403",
        msg: "You are not allowed to list product",
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

exports.addProductsAdmin = async (req, res, next) => {
  try {
    const { info } = req.body;
    const addProduct = await Product.addProductsAdminModel(info);
    if (addProduct) {
      res.status(200).json({
        status: "200",
        msg: "add product success",
        data: null,
      });
    } else {
      res.status(403).json({
        status: "403",
        msg: "You are not allowed to list product",
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

exports.updateProductsAdmin = async (req, res, next) => {
  try {
    const { info } = req.body;
    const addProduct = await Product.updateProductsAdminModel(info);
    if (addProduct) {
      res.status(200).json({
        status: "200",
        msg: "update product success",
        data: null,
      });
    } else {
      // res.status(403).json({
      //   status: "403",
      //   msg: "You are not allowed to update product",
      //   data: null,
      // });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.fetchProductSimilar = async (req, res, next) => {
  try {
    const { specs, idProduct } = req.body;
    const productSimilar = await Product.fetchProductSimilar(specs, idProduct);
    res.status(200).json({
      status: "200",
      msg: "get product success",
      data: productSimilar,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
