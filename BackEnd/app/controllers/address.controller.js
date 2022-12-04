const Address = require("../models/address.model");

exports.getAllCity = async (req, res, next) => {
  try {
    const [allCity] = await Address.fetchAllCity();
    if (allCity) {
      res.status(200).json(allCity);
    } else {
      res.status(403).json({
        status: "403",
        msg: "You are not allowed to list allAddress",
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

exports.getListDistrictByIdCity = async (req, res, next) => {
  try {
    const { idCity } = req.body;
    const [allDistrict] = await Address.fetchDistrictByIdCity(idCity);
    if (allDistrict) {
      res.status(200).json(allDistrict);
    } else {
      res.status(403).json({
        status: "403",
        msg: "You are not allowed to list allAddress",
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

exports.getListStreetByIdDistrict = async (req, res, next) => {
  try {
    const { idDistrict } = req.body;
    const [allStreet] = await Address.fetchStreetByIdDistrict(idDistrict);
    if (allStreet) {
      res.status(200).json(allStreet);
    } else {
      res.status(403).json({
        status: "403",
        msg: "You are not allowed to list allAddress",
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
