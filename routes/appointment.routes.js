const { verifyToken,verifyTokenAndRoleStudent } = require("../middleware/auth");
const controller = require("../controllers/appointment.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/appointments", [verifyTokenAndRoleStudent], controller.create);
  app.get("/api/appointments", [verifyToken], controller.findAll);
  app.put("/api/appointments/:id", [verifyToken], controller.updateStatus);
  app.get("/api/appointments/teacher/:teacherId", [verifyToken], controller.findByTeacher);
  app.get("/api/appointments/student/:studentId", [verifyToken], controller.findByStudent);
  app.put("/appointments/:id/accept", controller.acceptAppointment);
};
