const db = require("../utils/database");
const TABLE_NAME_PRODUCTS = "products";
const TABLE_NAME_IMAGES_PRODUCT = "imagesproduct";
const TABLE_NAME_SPECIFICATIONS = "specifications";
const TABLE_NAME_OPTIONS = "options";
const TABLE_NAME_ATTRIBUTES = "attributes";
const TABLE_NAME_BRANDS = "brands";
const TABLE_NAME_CATEGORIES = "categories";
const TABLE_NAME_EVALUATES = "evalues";
const TABLE_NAME_CUSTOMER = "customers";

class Evaluate {
  // admin
  /**
	 * SELECT *, `brands`.'name' as 'nameBrand' FROM `products` 
			inner join `brands` on `brands`.'idBrand' = `products`.`idBrand` 
			inner join `categories` on `products`.`idCategory` = `categories`.`idCategory`
	 * 
	 */
  getEvaluateByIdProduct = async (idProduct) => {
    const q = `select *, ${TABLE_NAME_EVALUATES}.updateAt As 'currentComment' from ${TABLE_NAME_EVALUATES} inner join ${TABLE_NAME_CUSTOMER} on ${TABLE_NAME_CUSTOMER}.idCustomer = ${TABLE_NAME_EVALUATES}.idCustomer where idProduct = ${idProduct} Order by updateAt DESC`;
    const queryEvaluates = await db.execute(q);
    console.log("queryEvaluates: ", q);
    return queryEvaluates[0];
  };

  postEvaluate = async (idCustomer, idProduct, title, content, stars) => {
    // return an array containing records of db
    let res = {};
    const query = `INSERT INTO ${TABLE_NAME_EVALUATES} (idCustomer, idProduct, title, content, stars) values (${idCustomer}, ${idProduct}, '${title}', '${content}', ${stars})`;
    const executeQuery = await db.execute(query);
    if (executeQuery?.[0]?.insertId) {
      res = { idValuate: executeQuery?.[0]?.insertId };
    } else {
      res = {};
    }
    return res;
  };
}

module.exports = new Evaluate();
