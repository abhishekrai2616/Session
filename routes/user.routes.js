const { verifyToken,verifyTokenAndMatchUserId } = require("../middleware/auth");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/teachers", [verifyToken], controller.findAllTeacher);
  app.get("/api/teacher/:id", [verifyToken], controller.findOneTeacher);
  app.put("/api/users/:id", [verifyTokenAndMatchUserId], controller.update);
  app.delete("/api/users/:id", [verifyTokenAndMatchUserId], controller.delete);
};
