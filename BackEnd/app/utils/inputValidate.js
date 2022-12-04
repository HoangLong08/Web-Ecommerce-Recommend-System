const { check } = require("express-validator");

let validateRegisterUser = () => {
  return [
    check("user.username", "username does not Empty").not().isEmpty(),
    check("user.username", "username must be Alphanumeric").isAlphanumeric(),
    check("user.username", "username more than 6 degits").isLength({ min: 6 }),
    check("user.email", "Invalid does not Empty").not().isEmpty(),
    check("user.email", "Invalid email").isEmail(),
    check("user.birthday", "Invalid birthday").isISO8601("yyyy-mm-dd"),
    check("user.password", "password more than 6 degits").isLength({ min: 6 }),
  ];
};

let validateLogin = (req, res, next) => {
  return [
    check("user.email", "Invalid does not Empty").not().isEmpty(),
    check("user.email", "Invalid email").isEmail(),
    check("user.password", "password more than 6 degits").isLength({ min: 6 }),
  ];
};

let validateDetailProduct = () => {
  return [check("idProduct", "Invalid does not Empty").not().isEmpty()];
};

let inputValidate = {
  validateRegisterUser: validateRegisterUser,
  validateLogin: validateLogin,
  validateDetailProduct: validateDetailProduct,
};

module.exports = inputValidate;
