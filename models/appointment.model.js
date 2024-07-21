module.exports = (sequelize, Sequelize) => {
    const Appointment = sequelize.define("appointment", {
      studentId: {
        type: Sequelize.INTEGER
      },
      teacherId: {
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY
      },
      time: {
        type: Sequelize.TIME
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Pending', 'Confirmed']
      }
    });
  
    return Appointment;
  };
  