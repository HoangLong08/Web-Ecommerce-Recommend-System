const db = require("../utils/database");
const TABLE_NAME_PRODUCTS = "products";
const TABLE_NAME_IMAGES_PRODUCT = "imagesproduct";
const TABLE_NAME_SPECIFICATIONS = "specifications";
const TABLE_NAME_OPTIONS = "options";
const TABLE_NAME_ATTRIBUTES = "attributes";
const TABLE_NAME_BRANDS = "brands";
const TABLE_NAME_CATEGORIES = "categories";

class Category {
  fetchAllCategoryAdmin = async () => {
    // return an array containing records of db
    return await db.execute(`select * from ${TABLE_NAME_CATEGORIES}`);
  };

  postCategoryAdmin = async (idCategory, name) => {
    return await db.execute(
      `update ${TABLE_NAME_CATEGORIES} set name = '${name}' where idCategory=${idCategory}`
    );
  };

  detailProductsAdmin = async (idCategory) => {
    // return an array containing records of db
    const q = `select * from ${TABLE_NAME_CATEGORIES} where idCategory = ${idCategory}`;

    const [exe] = await db.execute(q);
    return exe[0];
  };

  deleteCategoryAdmin = async (idCategory) => {
    const q = `delete from ${TABLE_NAME_CATEGORIES} where idCategory=${idCategory}`;
    return await db.execute(q);
  };

  addProductsAdmin = async (name) => {
    const q = `insert into ${TABLE_NAME_CATEGORIES} (name) values ('${name}')`;
    return await db.execute(q);
  };
}

module.exports = new Category();
