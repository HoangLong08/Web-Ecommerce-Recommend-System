const Auth = require("../models/auth.model");
const jwt = require("jsonwebtoken");

let refreshTokens = [];
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const infoUser = await Auth.loginUser(email, password);
    if (!infoUser?.idCustomer) {
      res.status(401).send({
        status: "401",
        msg: "Email or password wrong",
        data: null,
      });
    } else {
      const {
        idCustomer,
        name,
        email,
        avatar,
        phone,
        address,
        idCity,
        idDistrict,
        role,
      } = infoUser;
      const accessToken = jwt.sign(
        {
          idCustomer: idCustomer,
          email,
          name,
          role,
        },
        "jwtSecret",
        {
          expiresIn: "24h",
        }
      );

      const refreshToken = jwt.sign(
        {
          idCustomer: idCustomer,
          email: email,
          role,
        },
        "jwtRefreshSecret"
      );

      refreshTokens.push(refreshToken);
      res.status(200).json({
        status: "200",
        msg: "Đăng nhập thành công",
        data: {
          info: {
            idUser: idCustomer,
            name,
            email,
            avatar,
            phone,
            address,
            idCity,
            idDistrict,
            role,
          },
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const infoAdmin = await Auth.loginAdmin(email, password);
    if (!infoAdmin?.idCustomer) {
      res.status(400).send({
        status: "400",
        msg: "Email or password wrong",
        data: null,
      });
    } else {
      const accessToken = jwt.sign(
        {
          idUser: infoAdmin.idCustomer,
          email: infoAdmin.email,
          name: infoAdmin.name,
          isAdmin: infoAdmin.isAdmin,
          role: infoAdmin.role,
        },
        "jwtSecret",
        {
          expiresIn: "24h",
        }
      );

      const refreshToken = jwt.sign(
        {
          idUser: infoAdmin.idCustomer,
          email: infoAdmin.email,
          name: infoAdmin.name,
          isAdmin: infoAdmin.isAdmin,
          role: infoAdmin.role,
        },
        "jwtRefreshSecret"
      );

      refreshTokens.push(refreshToken);

      res.status(200).json({
        idUser: infoAdmin.idCustomer,
        email: infoAdmin.email,
        name: infoAdmin.name,
        role: infoAdmin.role,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.refreshAdmin = async (req, res, next) => {
  // refresh token
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      return res.status(401).json({
        status: "401",
        msg: "You are not authenticated",
        data: null,
      });
    }
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json({
        status: "403",
        msg: "Refresh token is not valid",
        data: null,
      });
    }

    jwt.verify(refreshToken, "jwtRefreshSecret", (err, user) => {
      if (err) {
        console.log("err refresh token: ", err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newAccessToken = jwt.sign(
        {
          idUser: user.idCustomer,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          role: user.role,
        },
        "jwtSecret",
        {
          expiresIn: "24h",
        }
      );

      const newRefreshToken = jwt.sign(
        {
          idUser: user.idCustomer,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          role: user.role,
        },
        "jwtRefreshSecret"
      );

      refreshTokens.push(newRefreshToken);
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.logoutAdmin = async (req, res, next) => {
  try {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter(token !== refreshToken);
    res.status(200).json({
      status: 200,
      msg: "You logged out successfully",
      data: null,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    const { fullName, email, password, idCity, idDistrict, idStreet, address } =
      req.body;
    const infoUser = await Auth.registerUser(
      fullName,
      email,
      password,
      idCity,
      idDistrict,
      idStreet,
      address
    );

    res.status(200).json({
      status: 200,
      msg: "Tạo tài khoản thành công",
      data: null,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    console.log("error register: ", error);
    next(error);
  }
};
