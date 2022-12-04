const Category = require("../models/category.model");

// exports.getAllProducts = async (req, res, next) => {
// 	try {
// 		const [allProducts] = await Product.fetchAll();
// 		res.status(200).json(allProducts)
// 	} catch (error) {
// 		if (!error.statusCode) {
// 			error.statusCode = 500
// 		}
// 		next(error)
// 	}
// }

// exports.getDetailProduct = async (req, res, next) => {
// 	try {
// 		const { idProduct } = req.body
// 		const detailProduct = await Product.detail(idProduct);
// 		if (!detailProduct?.idProduct) {
// 			res.status(404).send({
// 				status: "404",
// 				msg: "Not found",
// 				data: null
// 			});
// 		} else {
// 			res.status(200).json(detailProduct)
// 		}
// 	} catch (error) {
// 		if (!error.statusCode) {
// 			error.statusCode = 500
// 		}
// 		next(error)
// 	}

// }

// admin

exports.getAllCategoryAdmin = async (req, res, next) => {
  try {
    const [allCategories] = await Category.fetchAllCategoryAdmin();
    if (allCategories) {
      res.status(200).json(allCategories);
    } else {
      res.status(403).json({
        status: "403",
        msg: "You are not allowed to list allCategory",
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

exports.postCategoryAdmin = async (req, res, next) => {
  try {
    const { idCategory, name } = req.body;
    const updateCategory = await Category.postCategoryAdmin(idCategory, name);
    if (updateCategory) {
      res.status(200).json({
        status: "200",
        msg: "update category success",
        data: null,
      });
    } else {
      res.status(403).json({
        status: "403",
        msg: "You are not allowed to update category",
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

exports.detailProductsAdmin = async (req, res, next) => {
  try {
    const { idCategory } = req.body;
    const detailProduct = await Category.detailProductsAdmin(idCategory);
    if (detailProduct) {
      res.status(200).json({
        status: "200",
        msg: "get detail category success",
        data: detailProduct,
      });
    } else {
      res.status(404).json({
        status: "404",
        msg: "You are not found category",
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
    const { name } = req.body;
    const addProduct = await Category.addProductsAdmin(name);
    if (addProduct) {
      res.status(200).json({
        status: "200",
        msg: "add category success",
        data: addProduct,
      });
    } else {
      res.status(403).json({
        status: "403",
        msg: "You are not allowed to add category",
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

exports.deleteCategoryAdmin = async (req, res, next) => {
  try {
    const { idCategory } = req.params;
    const deleteCategory = await Category.deleteCategoryAdmin(idCategory);
    if (deleteCategory) {
      res.status(200).json({
        status: "200",
        msg: "delete category success",
        data: null,
      });
    } else {
      res.status(403).json({
        status: "403",
        msg: "You are not allowed to delete category",
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
