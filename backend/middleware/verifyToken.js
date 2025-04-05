const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    res.send({ message: "No Token Found" });
  }

  const token = bearerToken.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyToken;