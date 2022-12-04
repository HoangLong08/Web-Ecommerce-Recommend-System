const jwt = require("jsonwebtoken");
const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "jwtSecret", (err, user) => {
      if (err) {
        res.status(403).json({
          status: "403",
          msg: "Forbidden! Requires a token to access",
          data: null,
        });
      }
      req.role = user.role;
      next();
    });
  } else {
    res.status(401).json({
      status: "401",
      msg: "You are not authenticated",
      data: null,
    });
  }
};

const isAdmin = (req, res, next) => {
  const role = req.role;
  if (role.toLowerCase() === "admin") {
    next();
    return;
  }
  return res.status(403).json({
    status: "403",
    message: "Forbidden! Requires a token to access.",
  });
};

module.exports = {
  verify,
  isAdmin,
};
