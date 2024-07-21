const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

// Middleware to verify the token and check if the user ID matches the ID in the request params for update or delete
verifyTokenAndMatchUserId = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }

    if (decoded.id !== parseInt(req.params.id)) {
      return res.status(403).send({
        message: "User ID does not match!"
      });
    }

    req.userId = decoded.id;
    next();
  });
};

// Middleware to verify if the role is "Student"
verifyTokenAndRoleStudent = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }

    req.userId = decoded.id;

    const user = await User.findByPk(req.userId);

    if (!user || user.role !== "Student") {
      return res.status(403).send({
        message: "Require Student Role!"
      });
    }

    next();
  });
};

module.exports = {
  verifyToken: verifyToken,
  verifyTokenAndMatchUserId: verifyTokenAndMatchUserId,
  verifyTokenAndRoleStudent: verifyTokenAndRoleStudent
};
