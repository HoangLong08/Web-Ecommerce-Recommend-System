const jwt = require("jsonwebtoken");
const verifyClient = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "jwtSecret", (err, user) => {
      if (err) {
        res.status(403).json({
          status: "403",
          msg: "Token is not valid",
          data: null,
        });
      }
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

module.exports = verifyClient;
