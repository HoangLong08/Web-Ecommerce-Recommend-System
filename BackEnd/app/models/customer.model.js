const db = require("../utils/database");
const TABLE_NAME_PRODUCTS = "products";
const TABLE_NAME_IMAGES_PRODUCT = "imagesproduct";
const TABLE_NAME_SPECIFICATIONS = "specifications";
const TABLE_NAME_OPTIONS = "options";
const TABLE_NAME_ATTRIBUTES = "attributes";
const TABLE_NAME_BRANDS = "brands";
const TABLE_NAME_CATEGORIES = "categories";
const TABLE_NAME_CUSTOMERS = "customers";

class Category {
  fetchAllCategoryAdmin = async () => {
    // return an array containing records of db
    return await db.execute(`select * from ${TABLE_NAME_CUSTOMERS}`);
  };

  updateInfoCustomer = async (idCustomer, avatar, name, phone) => {
    const q = `update ${TABLE_NAME_CUSTOMERS} set avatar = '${avatar}', name = '${name}', phone = '${phone}' where idCustomer=${idCustomer}`;
    console.log("q: ", q);
    return await db.execute(q);
  };

  detailCustomer = async (idCustomer) => {
    // return an array containing records of db
    const q = `select * from ${TABLE_NAME_CUSTOMERS} where idCustomer = ${idCustomer}`;

    const [exe] = await db.execute(q);
    return exe[0];
  };

  getOrderByIdCustomer = async (idCategory) => {
    const q = `delete from ${TABLE_NAME_CUSTOMERS} where idCategory=${idCategory}`;
    return await db.execute(q);
  };
}

module.exports = new Category();
