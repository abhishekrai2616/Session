const db = require("../models");
const User = db.user;

// Check if username or email already exists
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  console.log("here i am")
  User.findOne({
    where: {
      name: req.body.name
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

module.exports = {
    checkDuplicateUsernameOrEmail
  };
