const db = require('../utils/database');
const TABLE_NAME_PRODUCTS = 'products';
const TABLE_NAME_IMAGES_PRODUCT = 'imagesproduct';
const TABLE_NAME_SPECIFICATIONS = 'specifications';
const TABLE_NAME_OPTIONS = 'options';
const TABLE_NAME_ATTRIBUTES = 'attributes';
const TABLE_NAME_BRANDS = 'brands';
const TABLE_NAME_CATEGORIES = 'categories'


class Brand {
	fetchAllBrandAdmin = async (idCategory, nameBrand) => { // return an array containing records of db
		let query = `select * from ${TABLE_NAME_BRANDS}`
		if (idCategory) {
			query += ` where idCategory = ${idCategory}`
		}
		return await db.execute(query);
	}
}

module.exports = new Brand;
