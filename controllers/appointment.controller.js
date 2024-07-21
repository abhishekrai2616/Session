const db = require("../models");
const Appointment = db.appointment;

exports.create = (req, res) => {
  Appointment.create({
    studentId: req.body.studentId,
    teacherId: req.body.teacherId,
    date: req.body.date,
    time: req.body.time,
    status: "Pending"
  })
    .then(appointment => {
      res.send(appointment);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  Appointment.findAll()
    .then(appointments => {
      res.send(appointments);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateStatus = (req, res) => {
  const id = req.params.id;

  Appointment.update({ status: req.body.status }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: "Appointment was updated successfully." });
      } else {
        res.send({
          message: `Cannot update Appointment with id=${id}. Maybe Appointment was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findByTeacher = (req, res) => {
  const teacherId = req.params.teacherId;

  Appointment.findAll({
    where: {
      teacherId: teacherId
    }
  })
    .then(appointments => {
      res.send(appointments);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findByStudent = (req, res) => {
  const studentId = req.params.studentId;

  Appointment.findAll({
    where: {
      studentId: studentId
    }
  })
    .then(appointments => {
      res.send(appointments);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

const isTeacherAvailable = async (teacherId, date, time) => {
    // Convert the time to a comparable format (e.g., minutes from midnight)
    const convertTimeToMinutes = (time) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };
  
    const appointmentTime = convertTimeToMinutes(time);
  
    // Find existing appointments on the same date with the teacher
    const appointments = await Appointment.findAll({
      where: {
        teacherId: teacherId,
        date: date,
        status: "Accepted" // Check for existing accepted appointments
      }
    });
  
    // Check if any existing appointment overlaps with the new appointment
    for (let appointment of appointments) {
      const existingTime = convertTimeToMinutes(appointment.time);
      const existingDuration = 30; // Assume a fixed duration of 30 minutes for each appointment
      const newAppointmentEnd = appointmentTime + 30; // Calculate end time for the new appointment
  
      // Check if the new appointment overlaps with the existing appointment
      if ((appointmentTime < (existingTime + existingDuration)) && (newAppointmentEnd > existingTime)) {
        return false; // Not available
      }
    }
  
    return true; // Available if no overlap is found
  };

  exports.acceptAppointment = async (req, res) => {
    const id = req.params.id;
    const { teacherId } = req.body; // Make sure to include teacherId in the request body
  
    try {
      // Find the appointment
      const appointment = await Appointment.findOne({ where: { id, teacherId } });
      if (!appointment) {
        return res.status(404).send({ message: `Appointment with id=${id} not found.` });
      }
  
      // Check if the teacher is available at the requested time
      const available = await isTeacherAvailable(teacherId, appointment.date, appointment.time);
      if (!available) {
        return res.status(400).send({ message: "Teacher is not available at the requested time." });
      }
  
      // Update the appointment status to "Accepted"
      const [updated] = await Appointment.update(
        { status: "Accepted" },
        { where: { id: id } }
      );
  
      if (updated) {
        res.send({ message: "Appointment was accepted successfully." });
      } else {
        res.status(400).send({ message: `Cannot accept Appointment with id=${id}.` });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };
