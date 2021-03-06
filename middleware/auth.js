const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header("x-auth-token");

  //check if no token
  if (!token) {
    res.status(401).json({ msg: "No token, authoraization denied" });
  }
  // veryfy token
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
