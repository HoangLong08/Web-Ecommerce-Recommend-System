const Brand = require('../models/brand.model');

// admin
exports.getAllBrandsAdmin = async (req, res, next) => {
	try {
		const { idCategory, nameBrand } = req.body
		const [allBrands] = await Brand.fetchAllBrandAdmin(idCategory, nameBrand);
		if (allBrands) {
			res.status(200).json(allBrands)
		} else {
			res.status(403).json({
				status: "403",
				msg: "You are not allowed to list allBrands",
				data: null
			})
		}
	} catch (error) {
		if (!error.statusCode) {
			error.statusCode = 500
		}
		next(error)
	}
}
