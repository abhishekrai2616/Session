const db = require("../models");
const User = db.user;

exports.findAllTeacher = (req, res) => {
    User.findAll({
      where: {
        role: "Teacher"
      }
    })
      .then(users => {
        res.send(users);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.findOneTeacher = (req, res) => {
    const id = req.params.id;
  
    User.findOne({
      where: {
        id: id,
        role: "Teacher"
      }
    })
      .then(user => {
        if (user) {
          res.send(user);
        } else {
          res.status(404).send({ message: `Cannot find User with id=${id} and role=Teacher.` });
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "User was updated successfully." });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "User was deleted successfully!" });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
