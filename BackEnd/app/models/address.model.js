const db = require("../utils/database");
const TABLE_NAME_PRODUCTS = "products";
const TABLE_NAME_IMAGES_PRODUCT = "imagesproduct";
const TABLE_NAME_SPECIFICATIONS = "specifications";
const TABLE_NAME_OPTIONS = "options";
const TABLE_NAME_ATTRIBUTES = "attributes";
const TABLE_NAME_BRANDS = "brands";
const TABLE_NAME_CATEGORIES = "categories";
const TABLE_NAME_CITIES = "cities";
const TABLE_NAME_DISTRICTS = "districts";
const TABLE_NAME_STREETS = "streets";

class Address {
  fetchAllCity = async () => {
    // return an array containing records of db
    let query = `select * from ${TABLE_NAME_CITIES}`;
    return await db.execute(query);
  };

  fetchDistrictByIdCity = async (idCity) => {
    // return an array containing records of db
    let query = `select * from ${TABLE_NAME_DISTRICTS} where idCity = ${idCity}`;
    return await db.execute(query);
  };

  fetchStreetByIdDistrict = async (idDistrict) => {
    // return an array containing records of db
    let query = `select * from ${TABLE_NAME_STREETS} where district_id = ${idDistrict}`;
    return await db.execute(query);
  };
}

module.exports = new Address();
